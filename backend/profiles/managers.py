from django.db import models
from django.db.models import Q


class ProfileManager(models.Manager):

    def get_indiv_watchlist(self, user, friend):
        user_watchlist = user.watchlist.all()
        friend_watchlist = friend.watchlist.all()

        user_watchlist_m = set([wm.movie for wm in user_watchlist])
        friend_watchlist_m = set([wm.movie for wm in friend_watchlist])

        indiv = [wm for wm in user_watchlist if wm.movie not in friend_watchlist_m]
        indiv += [wm for wm in friend_watchlist if wm.movie not in user_watchlist_m]

        return indiv

    def get_shared_watchlist(self, user, friend):
        user_watchlist = user.watchlist.all()
        friend_watchlist = [ml.movie for ml in friend.watchlist.all()]
        shared = [ml for ml in user_watchlist if ml.movie in friend_watchlist]

        return shared

    def get_joint_watchlist(self, user, friend):
        shared = self.get_shared_watchlist(user, friend)
        indiv = self.get_indiv_watchlist(user, friend)

        user_likes = set([ml.movie for ml in user.matchlist_likes.filter(friend=friend)])
        user_dislikes = set([md.movie for md in user.matchlist_dislikes.filter(friend=friend)])

        shared = [wm for wm in shared if wm.movie not in user_likes and wm.movie not in user_dislikes]
        indiv = [wm for wm in indiv if wm.movie not in user_likes and wm.movie not in user_dislikes]

        return shared + indiv


class FriendshipManager(models.Manager):

    def get_friends(self, user):
        friendships = self.model.objects.select_related("user", "friend").filter(Q(user=user) | Q(friend=user))

        return [u.user if u.friend == user else u.friend for u in friendships]
