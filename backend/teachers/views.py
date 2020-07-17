from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from app.models import UserInfo, Material, Visit
from teachers.models import Classes
from django.http import HttpResponse


# MARTIN IMPORTS
from sklearn import preprocessing
import martinscripts.SpeculativeRepresentation as S
import operator
import martinscripts.TrueLearn as TrueLearn
import martinscripts.Serial as Serial
from martinscripts.annotate_learners import annotate_learner, player_summary
import scipy.stats as stats
import math
import operator
from sklearn.manifold import TSNE
from sklearn.mixture import BayesianGaussianMixture
import numpy as np

# Create your views here.


# TOLE BO TREBA MAL BOL ROBUSTNO NAREST

number_of_features = 10
number_of_values = 4
max_value = 3

###################################################


class createInfo(APIView):
    def get(self, request):
        try:
            user = User.objects.get(username=request.user)

            classes = user.created_classes.all()

            ret = {
                'username': user.username,
                'classesCreated': [clas.name for clas in classes],
                'materials': [mat.name for mat in Material.objects.all()],
            }
            return Response(ret)
        except Exception as e:
            print(e)
            return Response(False)


class CreateClassroom(APIView):
    def post(self, request):

        name = request.data['name']
        description = request.data['description']
        creator = User.objects.get(username=request.user)
        materials = [Material.objects.get(name=mat)
                     for mat in request.data['materials']]
        students = [User.objects.get(username=student)
                    for student in request.data['students']]

        print(request.data)
        newclass = Classes.objects.create(
            name=name, description=description, creator=creator)
        newclass.materials.add(*materials)
        newclass.students.add(*students)

        return Response('success')


# ? should add??
""" class DeleteClassroom(APIView):
    def post(self,request):
         """


class UpdateClassroom(APIView):
    def post(self, request):
        currentname = request.data['currentname']

        name = request.data['name']
        description = request.data['description']
        creator = User.objects.get(username=request.user)
        print(request.data['materials'])
        materials = [Material.objects.get(name=mat)
                     for mat in request.data['materials']]

        students = [User.objects.get(username=student)
                    for student in request.data['students']]

        classroom = Classes.objects.get(name=currentname, creator=creator)

        classroom.name = name
        classroom.description = description
        classroom.creator = creator

        classroom.materials.clear()
        classroom.activeStudents.clear()

        classroom.materials.add(*materials)
        classroom.activeStudents.add(*students)
        classroom.save()
        print('updated classroom: '+currentname)
        return Response('success')


class Classrooms(APIView):
    def get(self, request):
        try:
            user = User.objects.get(username=request.user)
            classrooms = Classes.objects.filter(creator=user)
            ret = []
            for classroom in classrooms:
                info = {
                    'name': classroom.name,
                    'materials': classroom.materials.count(),
                    'students': classroom.students.count(),
                }
                ret.append(info)
            return Response(ret)
        except Exception as e:
            print(e)
            return Response(False)


class Classroom(APIView):
    def get(self, request, name):
        try:
            user = User.objects.get(username=request.user)
            classroom = Classes.objects.get(creator=user, name=name)
            ret = []

            ret = {
                'materials': [mat.name for mat in classroom.materials.all()],
            }
            return Response(ret)
        except Exception as e:
            print(e)
            return Response(False)


class ClassroomInfo(APIView):
    def get(self, request, name):
        user = User.objects.get(username=request.user)
        classroom = Classes.objects.get(creator=user, name=name)

        ret = {
            'title': classroom.name,
            'description': classroom.description,
            'classmaterials': [mat.name for mat in classroom.materials.all()],
            # active students
            'classstudents': [student.username for student in classroom.activeStudents.all()],
            'materials': [mat.name for mat in Material.objects.all()],
            # joined students
            'students': [user.username for user in classroom.students.all()],
        }

        return Response(ret)


class presentPlayer(APIView):
    def get(self, request, name):
        if not request.user.info.is_teacher:
            return HttpResponse('Unauthorized', status=401)
        userinfo = UserInfo.objects.get(user__username=name)
        learner = Serial.parm_to_skill(userinfo.params[0])

        ll = learner.learners
        if ll == {}:
            return HttpResponse('Empty user', status=500)

        # annotated_data = annotate_learner(ll)
        annotated_summary = player_summary(ll)

        visits = Visit.objects.filter(user=userinfo).order_by('-timeOfVisit').values(
            'material_id__name', 'material_id__url', 'timeOfVisit', 'engagement')[:10]

        resp = {
            'user': name,
            'usertype': userinfo.userType,
            'visits': visits,
            # 'annotated_data': annotated_data,
            'annotated_summary': annotated_summary
        }
        return(Response(resp))


class presentPlayers(APIView):
    def get(self, request, name):

        if not request.user.info.is_teacher or name == 'undefined':
            return HttpResponse('Unauthorized', status=401)
        try:
            user = User.objects.get(username=request.user)

            classroom = Classes.objects.get(name=name, creator=user)

            users = [x.info for x in classroom.students.all()]

            learners = [Serial.parm_to_skill(
                info.params[0]) for info in users]
            reprs = []

            for i in learners:
                rep = []
                for j in i.learners:

                    rep.append(i.learners[j].mu)
                if rep != []:
                    reprs.append(rep)

            reprs = np.array(reprs)

            # print(type(reprs[0]))
            # print(type(np.array(reprs)))

            reprs = np.array(reprs)

            # print(reprs.shape)

            tsne = TSNE(n_components=2)
            tsne = tsne.fit(reprs)

            # print('here')
            repX = tsne.embedding_[:, 0].tolist()
            repY = tsne.embedding_[:, 1].tolist()

            GM = BayesianGaussianMixture(n_components=2, max_iter=200)
            GM = GM.fit(reprs)
            clusters = GM.predict(reprs).tolist()

            usernames = [x.user.username for x in users]

            types = [x.userType for x in users]

            usersinfo = [{'x': obj[0], 'y': obj[1], 'type': obj[2], 'r': 10, 'user':obj[3]}
                         for obj in zip(repX, repY, types, usernames)]

            formatted = [
                {
                    'label': 'Blind students',
                    'data': [x for x in usersinfo if x['type'] == 0],
                    'backgroundColor': '#EA9AAD85'
                },
                {
                    'label': 'Partially blind students',
                    'data': [x for x in usersinfo if x['type'] == 1],
                    'backgroundColor': '#7EB7DF75'
                }
            ]

            # print(formatted)

            return(Response(formatted))
        except Exception as e:
            print(e)
            return HttpResponse(e, status=500)
