from django.apps import apps
from django.contrib.auth import models


class UserManager(models.UserManager):

    def search(self, query=''):
        if not query:
            return self.all()

        return self.filter(username__icontains=query)

    def get_matchlist(self, user, friend):
        MatchlistLike = apps.get_model('profiles', 'MatchlistLike')

        user_likes = user.matchlist_likes.filter(friend=friend).values('movie')
        friend_likes = friend.matchlist_likes.filter(friend=user).values('movie')
        mutual_liked_movies = [like['movie'] for like in user_likes.intersection(friend_likes)]

        return MatchlistLike.objects.filter(user=user, friend=friend, movie__in=mutual_liked_movies)

    def get_distinct_watchlist(self, user, friend):
        WatchlistMovie = apps.get_model('profiles', 'WatchlistMovie')

        user_watchlist = user.watchlist.values('movie')
        friend_watchlist = friend.watchlist.values('movie')

        union = user_watchlist.union(friend_watchlist)
        intersection = user_watchlist.intersection(friend_watchlist)
        symmetric_difference = union.difference(intersection)

        distinct_watchlist_movies = [movie['movie'] for movie in symmetric_difference]

        return WatchlistMovie.objects.filter(user__in=[user, friend], movie__in=distinct_watchlist_movies)

    def get_shared_watchlist(self, user, friend):
        WatchlistMovie = apps.get_model('profiles', 'WatchlistMovie')

        user_watchlist = user.watchlist.values('movie')
        friend_watchlist = friend.watchlist.values('movie')

        shared_watchlist_movies = [movie['movie'] for movie in user_watchlist.intersection(friend_watchlist)]

        return WatchlistMovie.objects.filter(user=user, movie__in=shared_watchlist_movies)

    def get_joint_watchlist(self, user, friend):
        shared = self.get_shared_watchlist(user, friend)
        indiv = self.get_distinct_watchlist(user, friend)
        user_likes = user.matchlist_likes.filter(friend=friend)
        user_dislikes = user.matchlist_dislikes.filter(friend=friend)

        shared = [wm for wm in shared if wm not in user_likes and wm not in user_dislikes]
        indiv = [wm for wm in indiv if wm not in user_likes and wm not in user_dislikes]

        return shared + indiv
