from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from app.models import UserInfo, Material
from django.contrib.auth import authenticate, login

import uuid

# MARTIN IMPORTS
from sklearn import preprocessing
import martinscripts.SpeculativeRepresentation as S
import operator
import martinscripts.TrueLearn as TrueLearn
import martinscripts.Serial as Serial


###################################################
""" # TOLE BO TREBA KONVERTAT V DATABAZO
resc = {'wiki1': ('https://sl.wikipedia.org/wiki/Wikipedija', [3, 3, 3, 3], None),
        'lego': ('https://www.lego.com/en-us/kids/the-lego-movie-2', [0, 1, 0, 1], None),
        'jacobin': ('https://jacobinmag.com/', [2, 2, 2, 2], None)
        }

users = {'martin': [[], 0]} """


# TOLE BO TREBA MAL BOL ROBUSTNO NAREST
speculative_induction = True

history = []

enc = preprocessing.OneHotEncoder(categories='auto')

number_of_features = 4
number_of_values = 5
max_value = 3

# possible values (levels of compliance as defined in ISO 40500:2012

# -1 := null value (speculative induction)
# 0 := non compliant
# 1 := A level compliance
# 2 := AA level compliance
# 3 := AAA level compliance

# enforcing correct encoding
dummyX = [[j-1 for i in range(number_of_features)]
          for j in range(number_of_values)]
enc = enc.fit(dummyX)


# workaround!!!!
# cannot call recomendations on fresh user!

dummy_row = [0 for i in range(number_of_features)]
# enforcing correct shape of classifiers:

# this warps the data - only for testing!!!!
# for i in users.keys():
# users[i][0].fit(enc.transform([dummy_row]).toarray(),[0])

###################################################


# todo -- USER HASH LOGIN SYSTEM
# User.objects.get(userinfo__userHash='<hash>')


class loginWOpass(APIView):
    def get(self, request):
        name = 'gregor'
        try:
            user = User.objects.get(username=name)
            login(request, user)
            print('logged in as', request.user)
            return Response('login successful')
        except:
            default_params = [[], 0]

            user = User.objects.create_user(name)
            UserInfo.objects.create(
                user=user, params=default_params, userHash=uuid.uuid4().hex)
            print('created new user', user.username)
            return Response('created new user '+str(user.username))

    def post(self, request):
        name = request.data['name']
        try:
            user = User.objects.get(username=name)
            login(request, user)
            print('logged in as', request.user)
            user = User.objects.get(username=user)
            return Response(user.userinfo.userHash)
        except:
            return Response('error')


class example(APIView):
    def get(self, request):

        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)


class test(APIView):
    def get(self, request):
        return Response('user not logged in')

    def post(self, request):
        print(request.data)
        return Response(request.data)


class allResources(APIView):
    def get(self, request):
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
    def get(self, request, hash):
        try:
            prob = []
            user = User.objects.get(userinfo__userHash=hash)

            learner = Serial.parm_to_skill(user.userinfo.params[0])

            all_mat = list(Material.objects.all().values(
                'name', 'vector', 'url'))

            if learner.learners == {}:
                for i in all_mat:
                    i.pop('vector', None)
                    i['probability'] = 0.5
                    prob.append(i)
                    print(i)
                return Response(prob)

            #! treba spremenit - drgacn formating gor za response!!!! (list je zdej)
            for i in all_mat:
                single_resource = i['vector']
                print(enc.transform([single_resource]).toarray())

                prob[i['name']] = learner.predict_proba(
                    enc.transform([single_resource]).toarray())

            return Response(prob)
        except:
            return Response('user error')

# engagement -- rate system


class updateLearner(APIView):

    def get(self, request, name, material, eng):
        curr_material = Material.objects.get(name=material)
        mat = curr_material.vector

        if speculative_induction == False:
            mat = enc.transform([mat]).toarray()
            y = [int(eng)]
        else:
            print(mat)
            mat = S.speculative_induction(mat, max_value)
            print(mat)
            mat = enc.transform(mat).toarray()
            y = [int(eng) for k in range(len(mat))]
            print(y)

        user = User.objects.get(username=name)

        learner = Serial.parm_to_skill(user.userinfo.params[0])
        learner.fit(mat, y)

        # save to database

        user.userinfo.params = [Serial.skill_to_parm(learner), 0]
        user.userinfo.save()

        return Response({name: user.userinfo.params})

# todo
# ! dodaj-uporabnika
