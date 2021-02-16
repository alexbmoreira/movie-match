from django.test import TestCase

from ..models import (FriendRequest, FriendsList, Matchlist, MovieLike,
                      Profile, User, Watchlist)
from ..serializers import (FriendRequestSerializer, FriendsListSerializer,
                           JointWatchListSerializer, MatchListSerializer,
                           ProfileSerializer, UserSerializer,
                           WatchListSerializer)


class UserSerializerTests(TestCase):

    def test_CreateUser(self):
        # Arrange
        user = {
            "id": 1,
            "username": "personName"
        }
        serializer = UserSerializer(data=user)

        # Act
        serializer.is_valid()
        user = serializer.save()

        # Assert
        self.assertIsNotNone(user)
        self.assertEqual(user.id, 1)
        self.assertEqual(user.username, "personName")
