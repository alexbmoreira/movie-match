from django.contrib.auth.models import User
from django.test import TestCase

from ..models import Profile


class UserSignalTests(TestCase):

    def test_CreateProfileOnUserCreate(self):
        # Arrange

        # Act
        user = User.objects.create_user(username="username")

        # Assert
        try:
            profile = Profile.objects.get(user=user)
        except Exception:
            profile = None
        self.assertIsNotNone(profile) # There is a profile the new user
