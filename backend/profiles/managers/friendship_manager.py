from django.db import models
from django.db.models import Q


class FriendshipManager(models.Manager):

    def get_friendships(self, user):
        return self.model.objects.filter(Q(user=user) | Q(friend=user))

    def get_friendship(self, user_id1, user_id2):
        try:
            return self.model.objects.get(Q(user=user_id1, friend=user_id2) | Q(user=user_id2, friend=user_id1))
        except self.model.DoesNotExist:
            return None

    def get_friends(self, user):
        friendships = self.model.objects.select_related("user", "friend").filter(Q(user=user) | Q(friend=user))

        return [u.user if u.friend == user else u.friend for u in friendships]
