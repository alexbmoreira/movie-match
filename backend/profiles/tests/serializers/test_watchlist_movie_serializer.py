from django.test import TestCase
from profiles.serializers import WatchlistMovieSerializer

from ..models import User


class WatchlistMovieSerializerTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='username')
        data = {
            'movie': 4995
        }
        self.serializer = WatchlistMovieSerializer(data=data, context={'user': self.user}) # Add Boogie Nights to user's watchlist

    def test_CreateValid(self):
        # Act
        self.serializer.is_valid()
        watchlist_movie = self.serializer.save()

        # Assert
        self.assertIsNotNone(watchlist_movie)
        self.assertEqual(watchlist_movie.user, self.user)
        self.assertEqual(watchlist_movie.movie, 4995)


