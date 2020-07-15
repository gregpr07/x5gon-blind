from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from app.models import UserInfo, Material, Visit
from teachers.models import Classes
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
import uuid

# MARTIN IMPORTS
from sklearn import preprocessing
import martinscripts.SpeculativeRepresentation as S
import operator
import martinscripts.TrueLearn as TrueLearn
import martinscripts.Serial as Serial
import scipy.stats as stats
import math
import operator
from sklearn.manifold import TSNE
from sklearn.mixture import BayesianGaussianMixture


###################################################
""" # TOLE BO TREBA KONVERTAT V DATABAZO
resc = {'wiki1': ('https://sl.wikipedia.org/wiki/Wikipedija', [3, 3, 3, 3], None),
        'lego': ('https://www.lego.com/en-us/kids/the-lego-movie-2', [0, 1, 0, 1], None),
        'jacobin': ('https://jacobinmag.com/', [2, 2, 2, 2], None)
        }

users = {'martin': [[], 0]} """


# TOLE BO TREBA MAL BOL ROBUSTNO NAREST
# todo - prenest global stvari v martin scripts
speculative_induction = False

history = []

enc = preprocessing.OneHotEncoder(categories='auto')

number_of_features = 10
number_of_values = 4
max_value = 3

dummyX = [[j for i in range(number_of_features)]
          for j in range(number_of_values)]
enc = enc.fit(dummyX)


# workaround!!!!
#! cannot call recomendations on fresh user!

dummy_row = [0 for i in range(number_of_features)]


# todo - add new materials view, api calls to x5gon


# ? if need more info about user
""" class getUserInfo(APIView):
    def get(self,request): """


class Myprofile(APIView):
    def get(self, request):
        try:
            user = request.user
            ret = {
                'name': user.username,
                'type': user.info.userType,
                'is_teacher': user.info.is_teacher
            }
            return Response(ret)

        except Exception as e:
            print(e)
            return HttpResponse(e, status=500)


class upgradeToTeacher(APIView):
    def post(self, request):
        try:
            print(request.user.info.upgrade_teacher())
            return Response('upgraded to teacher acc')

        except Exception as e:
            print(e)
            return HttpResponse(e, status=500)


class registerUser(APIView):
    def post(self, request):
        try:
            name = request.data['name']
            password = request.data['password']
            userType = int(request.data['userType'])
            is_teacher = bool(request.data['teacher'])
            default_params = [[], 0]

            user = User.objects.create_user(name, password=password)

            userinfo = UserInfo.objects.get(user=user)
            userinfo.params = default_params
            userinfo.userType = userType
            userinfo.is_teacher = is_teacher
            userinfo.save()
            print('created new user', user.username)
            return Response('created new user '+str(user.username))
        except Exception as e:
            print(e)
            return Response('error')


class addMaterial(APIView):
    def post(self, request):
        if not request.user.info.is_teacher:
            return HttpResponse('Unauthorized', status=401)
        try:
            data = request.data
            user = User.objects.get(username=request.user)

            mat = Material.objects.create(
                name=data['name'], displayName=data['dname'], url=data['url'], vector=data['vector'], addedBy=user)
            print(data['add_to'])
            try:
                if data['add_to']:
                    classroom = Classes.objects.get(name=data['add_to'])
                    classroom.materials.add(mat)
            except:
                pass
            return Response(request.data)
        except Exception as e:
            print(e)
            return HttpResponse(e, status=500)


class AvailableClassrooms(APIView):
    def get(self, request):
        try:
            user = User.objects.get(username=request.user)
            classes = user.classes.all()
            resp = [{'name': str(classroom.name), 'creator': str(classroom.creator)}
                    for classroom in classes]
            return Response(resp)

        except Exception as e:
            print(e)
            return HttpResponse('Unauthorized', status=401)


class example(APIView):
    def get(self, request):
        if not request.user.is_staff:
            return HttpResponse('Unauthorized', status=401)
        print('############', request.user, '############')
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)


class allResources(APIView):
    def get(self, request):
        if not request.user.is_staff:
            return HttpResponse('Unauthorized', status=401)
        print(request.user)
        all = Material.objects.all().values('displayName', 'url')
        return Response(all)


class trainingReccomendations(APIView):
    def get(self, request, name):
        prob = {}
        all = list(Material.objects.all().values('name', 'vector', 'url'))

        for element in all:
            prob[element['name']] = S.learning_score(
                element['vector'], max_value)

        return Response(prob)


class personalReccomendations(APIView):
    def get(self, request, name):
        try:

            prob = []
            user = User.objects.get(username=request.user)

            # print(user.is_authenticated)
            print(user.username)

            learner = Serial.parm_to_skill(user.info.params[0])

            materials = Classes.objects.get(name=name).materials

            all_mat = list(materials.values(
                'name', 'vector', 'url'))

            print(learner.learners)

            if learner.learners == {}:

                for i in all_mat:
                    i.pop('vector', None)
                    i['probability'] = 0.5
                    prob.append(i)
                return Response(prob)

            #! treba spremenit - drgacn formating gor za response!!!! (list je zdej)
            for i in all_mat:

                single_resource = i['vector']

                probability = learner.predict_proba(
                    enc.transform([single_resource]).toarray())

                i['probability'] = probability[0]
                prob.append(i)

            sort_prob = sorted(
                prob, key=lambda k: k['probability'], reverse=True)
            return Response(sort_prob[0:10])
        except Exception as e:
            print(str(e))
            return Response('user error')


class updateLearner(APIView):
    def post(self, request):
        material = request.data['material']
        eng = request.data['eng']
        name = request.user

        curr_material = Material.objects.get(name=material)
        mat = curr_material.vector

        if speculative_induction == False:
            # print(mat)
            mat = enc.transform([mat]).toarray()
            y = [int(eng)]
        else:
            # print(mat)
            mat = S.speculative_induction(mat, max_value)
            # print(mat)
            mat = enc.transform(mat).toarray()
            y = [int(eng) for k in range(len(mat))]
            # print(y)

        user = User.objects.get(username=name)

        learner = Serial.parm_to_skill(user.info.params[0])
        learner.fit(mat, y)

        # save to database

        material_obj = Material.objects.get(name=material)
        user_inf = UserInfo.objects.get(user=user)

        user.info.params = [Serial.skill_to_parm(learner), 0]
        user.info.save()

        Visit.objects.create(
            user=user_inf, material=material_obj, engagement=eng)
        return Response('updated user')

# todo
# ! dodaj-uporabnika
