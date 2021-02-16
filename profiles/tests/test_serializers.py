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
        self.assertEqual(user.username, "personName")


class FriendsListSerializerTests(TestCase):

    def test_CreateUser(self):
        # Arrange
        user = User.objects.create_user(username="personName")
        friend = User.objects.create_user(username="friendName")
        friends_list = {
            "user": {
                "id": user.id,
                "username": user.username
            },
            "friends": [
                {
                    "id": friend.id,
                    "username": friend.username
                }
            ]
        }
        serializer = FriendsListSerializer(data=friends_list)

        # Act
        serializer.is_valid()
        friends_list = serializer.save()

        # Assert
        self.assertIsNotNone(friends_list)
