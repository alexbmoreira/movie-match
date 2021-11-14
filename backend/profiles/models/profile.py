from django.contrib.auth.models import User
from django.db import models

from ..managers import ProfileManager


class Profile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    objects = ProfileManager()

    def __str__(self):
        return f"({self.user.id}) {self.user.username}"
