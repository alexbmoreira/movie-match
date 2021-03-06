# Generated by Django 3.1.5 on 2021-04-16 01:18

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('profiles', '0020_auto_20210415_0031'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='friendrequest',
            unique_together={('creator', 'receiver')},
        ),
        migrations.AlterUniqueTogether(
            name='friendship',
            unique_together={('user', 'friend')},
        ),
        migrations.AlterUniqueTogether(
            name='matchlistdislike',
            unique_together={('user', 'friend', 'movie')},
        ),
        migrations.AlterUniqueTogether(
            name='matchlistlike',
            unique_together={('user', 'friend', 'movie')},
        ),
        migrations.AlterUniqueTogether(
            name='watchlistmovie',
            unique_together={('user', 'movie')},
        ),
    ]
