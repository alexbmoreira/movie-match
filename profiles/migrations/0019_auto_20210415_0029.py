# Generated by Django 3.1.5 on 2021-04-15 00:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('profiles', '0018_auto_20210414_2221'),
    ]

    operations = [
        migrations.AlterField(
            model_name='matchlistdislike',
            name='friend',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='matchlistdislike',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='matchlist_dislikes', to=settings.AUTH_USER_MODEL),
        ),
    ]
