from django.test import RequestFactory, TestCase
from profiles.models import User
from profiles.serializers import WatchlistMovieSerializer

from ..factories import UserFactory


class WatchlistMovieSerializerTests(TestCase):

    def setUp(self):
        self.user = UserFactory(username='peter_griffin')
        self.data = {
            'movie': 4995
        }
        self.request = RequestFactory().post('./user/watchlist')
        self.request.user = self.user
        self.serializer = WatchlistMovieSerializer(data=self.data, context={'request': self.request}) # Add Boogie Nights to user's watchlist

    def test_CreateValid(self):
        # Act
        self.serializer.is_valid()
        watchlist_movie = self.serializer.save()

        # Assert
        self.assertIsNotNone(watchlist_movie)
        self.assertEqual(watchlist_movie.user, self.user)
        self.assertEqual(watchlist_movie.movie, 4995)


