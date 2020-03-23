from django.db import models
from django.contrib.auth.models import User
from app.models import Material


class Classes(models.Model):
    name = models.CharField(max_length=150, unique=True)
    description = models.CharField(max_length=250)
    creator = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, related_name='created_classes')
    materials = models.ManyToManyField(
        Material, related_name='classes')
    students = models.ManyToManyField(User, related_name='classes')

    def __str__(self):
        return self.name
