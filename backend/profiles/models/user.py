import random

from django.contrib.auth.models import AbstractUser
from django.db import models

from ..managers import UserManager


def avatar_color_default():
    return ("#%06x" % random.randint(0, 0xFFFFFF)).upper()


class User(AbstractUser):

    avatar_color = models.TextField(blank=True, default=avatar_color_default)

    objects = UserManager()

    def __str__(self):
        return f"({self.id}) {self.username}"


