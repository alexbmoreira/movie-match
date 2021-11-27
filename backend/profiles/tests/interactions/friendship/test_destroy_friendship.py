from django.test import TestCase
from profiles.interactions.friendship import DestroyFriendship
from profiles.tests.factories import FriendshipFactory, UserFactory


class DestroyFriendshipTests(TestCase):

    def setUp(self):
        self.user1 = UserFactory(username='big_daddy')
        self.user2 = UserFactory(username='waterboy')
        self.user3 = UserFactory(username='little_nicky')
        
        self.friendship1 = FriendshipFactory(user=self.user1, friend=self.user2)
        self.friendship2 = FriendshipFactory(user=self.user3, friend=self.user1)

    def test_DestroysFriendships(self):
        DestroyFriendship.run(friendship=self.friendship1)

        self.assertIsNone(self.friendship1.id)
        self.assertIsNotNone(self.friendship2.id)
