# Generated by Django 2.2.7 on 2020-07-17 09:27

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('teachers', '0009_classes_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='classes',
            name='activeStudents',
            field=models.ManyToManyField(related_name='joined_classes', to=settings.AUTH_USER_MODEL),
        ),
    ]