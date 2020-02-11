from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField, JSONField
from django.utils import timezone
from django.db.models.signals import post_save

import uuid


class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    params = JSONField(default=list)
    #userHash = models.CharField(max_length=100, default=uuid.uuid4().hex)
    userType = models.IntegerField(default=0)


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserInfo.objects.create(user=instance)


post_save.connect(create_user_profile, sender=User)


class Material(models.Model):
    name = models.CharField(max_length=100)
    displayName = models.CharField(max_length=100)
    url = models.URLField()
    vector = ArrayField(models.IntegerField())
    addedBy = models.ForeignKey(
        User, on_delete=models.SET_NULL, default=None, null=True)


class Visit(models.Model):
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    material = models.ForeignKey(
        Material, on_delete=models.SET_NULL, null=True)
    timeOfVisit = models.DateTimeField(
        default=timezone.now, blank=True)
    engagement = models.IntegerField()
