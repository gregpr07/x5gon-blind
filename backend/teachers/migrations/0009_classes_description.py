# Generated by Django 2.2.7 on 2020-03-22 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0008_auto_20200322_1723'),
    ]

    operations = [
        migrations.AddField(
            model_name='classes',
            name='description',
            field=models.CharField(default='default', max_length=250),
            preserve_default=False,
        ),
    ]
