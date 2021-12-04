from django.test import TestCase
from profiles.interactions.watchlist import CreateWatchlistMovie
from profiles.tests.factories import UserFactory, WatchlistMovieFactory


class CreateWatchlistMovieTests(TestCase):

    def setUp(self):
        self.user1 = UserFactory()
        
        WatchlistMovieFactory(user=self.user1, movie=4995)

    def test_AddsAMovieToAWatchlist(self):
        CreateWatchlistMovie.run(user=self.user1, movie=12133)

        self.assertEqual(self.user1.watchlist.count(), 2)
