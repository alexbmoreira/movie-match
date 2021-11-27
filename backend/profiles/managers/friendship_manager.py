from django.db import models
from django.db.models import Q


class FriendshipManager(models.Manager):

    def get_friendships(self, user):
        return self.model.objects.filter(Q(user=user) | Q(friend=user))

    def get_friends(self, user):
        friendships = self.model.objects.select_related("user", "friend").filter(Q(user=user) | Q(friend=user))

        return [u.user if u.friend == user else u.friend for u in friendships]
