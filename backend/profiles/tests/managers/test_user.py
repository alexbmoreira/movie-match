from django.test import TestCase

from ...models import User
from ..factories import UserFactory, WatchlistMovieFactory


class UserTests(TestCase):

    def setUp(self):
        self.user1 = UserFactory(username='big_daddy')
        self.user2 = UserFactory(username='waterboy')
        UserFactory(username='little_nicky')
        UserFactory(username='thats_my_boy')

class SearchTests(UserTests):

    def test_ReturnsAllOnNoSearchQuery(self):
        users = User.objects.search()

        self.assertEqual(users.count(), User.objects.count())

    def test_ReturnsMatchingUsers(self):
        users = User.objects.search('boy')

        self.assertEqual(users.count(), 2)
        self.assertIn(User.objects.get(username='waterboy'), users)
        self.assertIn(User.objects.get(username='thats_my_boy'), users)

    def test_ReturnsNoneOnNoMatch(self):
        users = User.objects.search('adam_sandler')

        self.assertEqual(users.count(), 0)

class WatchlistTests(UserTests):

    def setUp(self):
        super().setUp()
        WatchlistMovieFactory(user=self.user1, movie=10402)
        WatchlistMovieFactory(user=self.user2, movie=10402)
        WatchlistMovieFactory(user=self.user1, movie=4995)
        WatchlistMovieFactory(user=self.user2, movie=1991)

class SharedWatchlistTests(WatchlistTests):

    def test_returns_correct(self):
        shared = User.objects.get_shared_watchlist(self.user1, self.user2)

        self.assertEqual(len(shared), 1)
        self.assertIn(10402, [m.movie for m in shared])
        self.assertNotIn(4995, [m.movie for m in shared])
        self.assertNotIn(1991, [m.movie for m in shared])

class DistinctWatchlistTests(WatchlistTests):

    def test_returns_correct(self):
        distinct = User.objects.get_distinct_watchlist(self.user1, self.user2)

        self.assertEqual(len(distinct), 2)
        self.assertNotIn(10402, [m.movie for m in distinct])
        self.assertIn(4995, [m.movie for m in distinct])
        self.assertIn(1991, [m.movie for m in distinct])

class JointWatchlistTests(WatchlistTests):

    def test_returns_correct(self):
        joint_watchlist = User.objects.get_joint_watchlist(self.user1, self.user2)

        self.assertEqual(len(joint_watchlist), 3)
        self.assertEqual(joint_watchlist[0].movie, 10402)
        self.assertIn(4995, [m.movie for m in joint_watchlist[1:3]])
        self.assertIn(1991, [m.movie for m in joint_watchlist[1:3]])
