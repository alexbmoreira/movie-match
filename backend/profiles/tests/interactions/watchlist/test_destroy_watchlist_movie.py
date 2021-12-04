from django.test import TestCase
from profiles.interactions.watchlist import DestroyWatchlistMovie
from profiles.tests.factories import UserFactory, WatchlistMovieFactory


class DestroyWatchlistMovieTests(TestCase):

    def setUp(self):
        self.user1 = UserFactory()
        
        self.watchlist_movie = WatchlistMovieFactory(user=self.user1, movie=4995)

    def test_DestroysFriendships(self):
        DestroyWatchlistMovie.run(movie=self.watchlist_movie)

        self.assertEqual(self.user1.watchlist.count(), 0)
