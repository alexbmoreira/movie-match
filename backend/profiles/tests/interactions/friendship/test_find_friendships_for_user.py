from django.test import TestCase
from profiles.interactions.friendship import FindFriendshipsForUser
from profiles.tests.factories import FriendshipFactory, UserFactory


class FindFriendshipsForUserTests(TestCase):

    def setUp(self):
        self.user1 = UserFactory(username='big_daddy')
        self.user2 = UserFactory(username='waterboy')
        self.user3 = UserFactory(username='little_nicky')
        
        self.friendship1 = FriendshipFactory(user=self.user1, friend=self.user2)
        self.friendship2 = FriendshipFactory(user=self.user3, friend=self.user1)
        self.friendship3 = FriendshipFactory(user=self.user3, friend=self.user2)

    def test_FindsFriendshipsForAUser(self):
        friendships = FindFriendshipsForUser.run(user=self.user1)

        self.assertEqual(friendships.count(), 2)
        self.assertIn(self.friendship1, friendships)
        self.assertIn(self.friendship2, friendships)
