# Generated by Django 2.2.7 on 2020-02-02 13:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_auto_20200202_1244'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userinfo',
            name='userHash',
        ),
    ]
