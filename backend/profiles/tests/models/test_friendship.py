from django.test import TestCase

from ...models import Friendship, User
from ..factories import FriendshipFactory, UserFactory


class FriendshipTests(TestCase):

    def setUp(self):
        self.user1 = UserFactory(username='big_daddy')
        self.user2 = UserFactory(username='waterboy')
        self.user3 = UserFactory(username='little_nicky')
        self.user4 = UserFactory(username='hubie_halloween')
        
        FriendshipFactory(user=self.user1, friend=self.user2)
        FriendshipFactory(user=self.user3, friend=self.user1)
        FriendshipFactory(user=self.user3, friend=self.user2)

class GetFriendshipTests(FriendshipTests):

    def test_ReturnsFriendships(self):
        friendships = Friendship.objects.get_friendships(self.user1)

        self.assertEqual(friendships.count(), 2)
        self.assertIsInstance(friendships[0], Friendship)
        self.assertEqual(friendships[0].friend, self.user2)
        self.assertEqual(friendships[1].user, self.user3)

    def test_ReturnsNoFriendshipsWhenNoneExist(self):
        friendships = Friendship.objects.get_friendships(self.user4)

        self.assertEqual(friendships.count(), 0)

class GetFriendsTests(FriendshipTests):

    def test_ReturnsFriends(self):
        friends = Friendship.objects.get_friends(self.user1)

        self.assertEqual(len(friends), 2)
        self.assertIsInstance(friends[0], User)
        self.assertIn(self.user2, friends)
        self.assertIn(self.user3, friends)

    def test_ReturnsNoFriendsWhenNoneExist(self):
        friends = Friendship.objects.get_friends(self.user4)

        self.assertEqual(len(friends), 0)
