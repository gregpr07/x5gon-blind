from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from app.models import UserInfo, Material, Visit


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


class presentPlayer(APIView):

    def get(self, request, name):
        #user = User.objects.get(username=name)
        #learner = Serial.parm_to_skill(user.userinfo.params[0])
        userinfo = UserInfo.objects.get(user__username=name)
        learner = Serial.parm_to_skill(userinfo.params[0])

        ll = learner.learners
        if ll == {}:
            return (Response('Error'))

        #annotated_data = annotate_learner(ll)
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

    def get(self, request):
        users = list(UserInfo.objects.all())
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
        
        types = [x.type for x in users]

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
