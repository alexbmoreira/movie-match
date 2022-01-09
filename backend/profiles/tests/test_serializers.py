from django.test import TestCase

from ..models import User
from ..serializers import (FriendRequestSerializer, MatchlistDislikeSerializer,
                           MatchlistLikeSerializer)


class MatchlistLikeSerializerTests(TestCase):

    def test_CreateValid(self):
        # Arrange
        user = User.objects.create_user(username='username')
        friend = User.objects.create_user(username='friend')
        d = {
            'movie': 4995,
            'friend': friend.id
        }
        serializer = MatchlistLikeSerializer(data=d, context={'user_id': user.id}) # Like Boogie Nights with 'friend'

        # Act
        serializer.is_valid()
        matchlist_like = serializer.save()

        # Assert
        self.assertIsNotNone(matchlist_like)
        self.assertEqual(matchlist_like.user, user)
        self.assertEqual(matchlist_like.friend, friend)
        self.assertEqual(matchlist_like.movie, 4995)


class MatchlistDislikeSerializerTests(TestCase):

    def test_CreateValid(self):
        # Arrange
        user = User.objects.create_user(username='username')
        friend = User.objects.create_user(username='friend')
        d = {
            'movie': 464052,
            'friend': friend.id
        }
        serializer = MatchlistDislikeSerializer(data=d, context={'user_id': user.id}) # Dislike WW84 with 'friend'

        # Act
        serializer.is_valid()
        matchlist_dislike = serializer.save()

        # Assert
        self.assertIsNotNone(matchlist_dislike)
        self.assertEqual(matchlist_dislike.user, user)
        self.assertEqual(matchlist_dislike.friend, friend)
        self.assertEqual(matchlist_dislike.movie, 464052)
