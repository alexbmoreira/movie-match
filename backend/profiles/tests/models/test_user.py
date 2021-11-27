from django.test import TestCase

from ...models import Profile
from ..factories import UserFactory


class UserTests(TestCase):

    def setUp(self):
        self.user = UserFactory()

    def test_CreatesProfileWithUser(self):
        profile = Profile.objects.filter(user=self.user)

        self.assertIsNotNone(profile)
