from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField, JSONField


class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # todo - slep al skrin user
    params = JSONField()
    userHash = models.CharField(max_length=100)


""" 
how to use:
############

from app.models import UserInfo
from django.contrib.auth.models import User

user = User.objects.get(username='martin')

UserInfo.save()


############
"""


class Material(models.Model):
    name = models.CharField(max_length=100)
    displayName = models.CharField(max_length=100)
    url = models.URLField()
    vector = ArrayField(models.IntegerField())
    IDKparam = models.CharField(null=True, max_length=100)
