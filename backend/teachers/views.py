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
import scipy.stats as stats
import math
import operator
from sklearn.manifold import TSNE
from sklearn.mixture import BayesianGaussianMixture
import numpy as np

# Create your views here.


# TOLE BO TREBA MAL BOL ROBUSTNO NAREST
speculative_induction = True

history = []

enc = preprocessing.OneHotEncoder(categories='auto')

number_of_features = 4
number_of_values = 5
max_value = 3

dummyX = [[j-1 for i in range(number_of_features)]
          for j in range(number_of_values)]
enc = enc.fit(dummyX)


dummy_row = [0 for i in range(number_of_features)]

###################################################


class displayGauisan(APIView):

    def get(self, request, name):
        user = User.objects.get(username=name)
        learner = Serial.parm_to_skill(user.userinfo.params[0])
        x = np.linspace(-5, 5, 100)
        y = []

        l = learner.learners
        mu = {i: l[i].mu for i in l.keys()}
        sigma = {i: l[i].sigma for i in l.keys()}
        sorted_mu = sorted(mu.items(), key=operator.itemgetter(1))
        sorted_sigma = sorted(sigma.items(), key=operator.itemgetter(1))
        for i in range(len(sorted_mu)):
            mu = sorted_mu[i][1]
            variance = sorted_sigma[i][1]
            sigma = math.sqrt(variance)
            y.append(stats.norm.pdf(x, mu, sigma))

        return(Response([list(x), list(y)]))


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
        tsne = TSNE(n_components=2)
        tsne = tsne.fit(reprs)
        repX = tsne.embedding_[:, 0].tolist()
        repY = tsne.embedding_[:, 1].tolist()

        GM = BayesianGaussianMixture(n_components=2, max_iter=200)
        GM = GM.fit(reprs)
        clusters = GM.predict(reprs).tolist()

        formatted = [{'x': obj[0], 'y': obj[1], 'color': obj[2], 'r': 10}
                     for obj in zip(repX, repY, clusters)]

        print(formatted)

        return(Response(formatted))
