from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

# MARTIN IMPORTS
from sklearn import preprocessing
import martinscripts.SpeculativeRepresentation as S
import operator
import martinscripts.TrueLearn as TrueLearn
import martinscripts.Serial as Serial


###################################################
# TOLE BO TREBA KONVERTAT V DATABAZO
resc = {'wiki1': ('https://sl.wikipedia.org/wiki/Wikipedija', [3, 3, 3, 3], None),
        'lego': ('https://www.lego.com/en-us/kids/the-lego-movie-2', [0, 1, 0, 1], None),
        'jacobin': ('https://jacobinmag.com/', [2, 2, 2, 2], None)
        }

users = {'martin': [[], 0]}


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


class loginWOpass(APIView):
    def get(self, request, name):
        try:
            user = User.objects.get(username=name)
            login(request, user)
            print('logged in as', request.user)
            return Response('login successful')
        except:
            user = User.objects.create_user(name)
            print('created new user', user.username)
            return Response('created new user '+str(user.username))


class example(APIView):
    def get(self, request):

        # KODA GRE TUKEJ

        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)


class allResources(APIView):
    def get(self, request):
        print(request.user)
        return Response(resc)


class trainingReccomendations(APIView):
    def get(self, request, name):
        prob = {}

        for i in resc.keys():
            prob[i] = S.learning_score(resc[i][1], max_value)

        return Response(prob)


class personalReccomendations(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            prob = {}
            name = str(request.user)
            learner = Serial.parm_to_skill(users[name][0])

            # check for new user:
            if learner.learners == {}:
                for i in resc.keys():
                    prob[i] = 0.5
                return Response(prob)

            for i in resc.keys():
                single_resource = resc[i][1]
                print(enc.transform([single_resource]).toarray())

                prob[i] = learner.predict_proba(
                    enc.transform([single_resource]).toarray())

            return Response(prob)
        else:
            return Response('user not logged in')


class updateLearner(APIView):
    def get(self, request, name, material, eng):
        if speculative_induction == False:
            mat = resc[material][1]
            mat = enc.transform([mat]).toarray()
            y = [int(eng)]
        else:
            mat = resc[material][1]
            print(mat)
            mat = S.speculative_induction(mat, max_value)
            print(mat)
            mat = enc.transform(mat).toarray()
            y = [int(eng) for k in range(len(mat))]
            print(y)
        # print(mat)

        # print(users[name][0])

        learner = Serial.parm_to_skill(users[name][0])
        learner.fit(mat, y)

        users[name][0] = Serial.skill_to_parm(learner)
        # redirect('/priporocila/<name>')

        return Response(users)

# todo
# ? add /priporocila/ucenje/<name>
# and
# ? /uporabnik/<name>/<material>/<eng>
# and
# ! dodaj-uporabnika
