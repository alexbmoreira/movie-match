# Generated by Django 3.1.5 on 2022-01-22 03:08

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0005_auto_20220122_0303'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='friendrequest',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterModelOptions(
            name='friendship',
            options={'ordering': ['-created_at']},
        ),
        migrations.AddField(
            model_name='friendrequest',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='friendship',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]