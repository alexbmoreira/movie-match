from django.contrib.auth.models import User
from django.test import TestCase

from ..serializers import (FriendRequestSerializer, MatchlistDislikeSerializer,
                           MatchlistLikeSerializer, WatchlistMovieSerializer)


class FriendRequestSerializerTests(TestCase):

    def test_CreateValid(self):
        # Arrange
        u = User.objects.create(username='username')
        r = User.objects.create(username='new_friend')
        data = {
            'creator': u.id,
            'receiver': r.id,
            'active': True
        }
        serializer = FriendRequestSerializer(data=data)

        # Act
        serializer.is_valid()
        friend_request = serializer.save()

        # Assert
        self.assertIsNotNone(friend_request)
        self.assertEqual(friend_request.creator.username, 'username')
        self.assertEqual(friend_request.receiver.username, 'new_friend')


class WatchlistMovieSerializerTests(TestCase):

    def test_CreateValid(self):
        # Arrange
        user = User.objects.create_user(username='username')
        d = {
            'movie': 4995
        }
        serializer = WatchlistMovieSerializer(data=d, context={'user_id': user.id}) # Add Boogie Nights to user's watchlist

        # Act
        serializer.is_valid()
        watchlist_movie = serializer.save()

        # Assert
        self.assertIsNotNone(watchlist_movie)
        self.assertEqual(watchlist_movie.user, user)
        self.assertEqual(watchlist_movie.movie, 4995)


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
