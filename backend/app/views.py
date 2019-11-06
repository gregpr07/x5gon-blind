from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth.models import User


class example(APIView):
    def get(self, request):

        # KODA GRE TUKEJ

        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)
