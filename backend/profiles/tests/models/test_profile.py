from django.test import TestCase

from ...models import Profile, User
from ..factories import UserFactory


class ProfileTests(TestCase):

    def setUp(self):
        UserFactory(username='big_daddy')
        UserFactory(username='waterboy')
        UserFactory(username='little_nicky')
        UserFactory(username='thats_my_boy')

class SearchTests(ProfileTests):

    def test_ReturnsAllOnNoSearchQuery(self):
        profiles = Profile.objects.search()

        self.assertEqual(profiles.count(), Profile.objects.count())

    def test_ReturnsMatchingProfiles(self):
        profiles = Profile.objects.search('boy')

        self.assertEqual(profiles.count(), 2)
        self.assertIn(Profile.objects.get(user__username='waterboy'), profiles)
        self.assertIn(Profile.objects.get(user__username='thats_my_boy'), profiles)

    def test_ReturnsNoneOnNoMatch(self):
        profiles = Profile.objects.search('adam_sandler')

        self.assertEqual(profiles.count(), 0)
