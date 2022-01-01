from django.contrib.auth.models import AbstractUser
from django.db import models

from ..managers import UserManager


class User(AbstractUser):

    objects = UserManager()

    def __str__(self):
        return f"({self.id}) {self.username}"
