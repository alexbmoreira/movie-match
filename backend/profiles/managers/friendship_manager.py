from django.db import models
from django.db.models import Q
from django.shortcuts import get_object_or_404


class FriendshipManager(models.Manager):

    def get_friendships(self, user):
        return self.model.objects.filter(Q(user=user) | Q(friend=user))

    def get_friendship(self, user1, user2):
        try:
            return self.model.objects.get(Q(user=user1, friend=user2) | Q(user=user2, friend=user1))
        except self.model.DoesNotExist:
            return None

    def get_friends(self, user):
        friendships = self.model.objects.select_related("user", "friend").filter(Q(user=user) | Q(friend=user))

        return [u.user if u.friend == user else u.friend for u in friendships]
