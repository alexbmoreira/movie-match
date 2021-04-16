from django.test import TestCase

from ..models import FriendRequest, Friendship, Profile, User


class FriendRequestTests(TestCase):

    def test_AcceptRequest(self):
        # Arrange
        user1 = User.objects.create_user(username="joey")
        user2 = User.objects.create_user(username="carl")

        req1 = FriendRequest.objects.create(creator=user1, receiver=user2) # Joey sends a request to Carl

        # Act
        req1.accept()

        # Assert
        try:
            friendship = Friendship.objects.get(user=user1, friend=user2)
        except Exception:
            friendship = None
        self.assertIsNotNone(friendship) # There is a friendship between Joey and Carl

    def test_DeclineRequest(self):
        # Arrange
        user1 = User.objects.create_user(username="joey")
        user2 = User.objects.create_user(username="carl")

        req1 = FriendRequest.objects.create(creator=user1, receiver=user2) # Joey sends a request to Carl

        # Act
        req1.decline()

        # Assert
        try:
            friendship = Friendship.objects.get(user=user1, friend=user2)
        except Exception:
            friendship = None
        self.assertIsNone(friendship) # There is no friendship between Joey and Carl

    def test_CancelRequest(self):
        # Arrange
        user1 = User.objects.create_user(username="joey")
        user2 = User.objects.create_user(username="carl")

        req1 = FriendRequest.objects.create(creator=user1, receiver=user2) # Joey sends a request to Carl

        # Act
        req1.cancel()

        # Assert
        try:
            friendship = Friendship.objects.get(user=user1, friend=user2)
        except Exception:
            friendship = None
        self.assertIsNone(friendship) # There is no friendship between Joey and Carl
