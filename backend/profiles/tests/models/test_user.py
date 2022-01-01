from django.test import TestCase

from ...models import User
from ..factories import UserFactory


class UserTests(TestCase):

    def setUp(self):
        UserFactory(username='big_daddy')
        UserFactory(username='waterboy')
        UserFactory(username='little_nicky')
        UserFactory(username='thats_my_boy')

class SearchTests(UserTests):

    def test_ReturnsAllOnNoSearchQuery(self):
        users = User.objects.search()

        self.assertEqual(users.count(), User.objects.count())

    def test_ReturnsMatchingUsers(self):
        users = User.objects.search('boy')

        self.assertEqual(users.count(), 2)
        self.assertIn(User.objects.get(username='waterboy'), users)
        self.assertIn(User.objects.get(username='thats_my_boy'), users)

    def test_ReturnsNoneOnNoMatch(self):
        users = User.objects.search('adam_sandler')

        self.assertEqual(users.count(), 0)
