from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField, JSONField
from django.utils import timezone


class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # todo - slep al skrin user
    params = JSONField()
    userHash = models.CharField(max_length=100)
    userType = models.IntegerField()


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


class Visit(models.Model):
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    material = models.ForeignKey(
        Material, on_delete=models.SET_NULL, null=True)
    timeOfVisit = models.DateTimeField(
        default=timezone.now, blank=True)
    engagement = models.IntegerField()
