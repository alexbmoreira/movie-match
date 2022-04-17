from django.db import models
from django.db.models import Q


class FriendRequestManager(models.Manager):

    def get_friend_requests(self, user):
        return self.model.objects.filter(Q(creator=user) | Q(receiver=user))

    def get_friend_request(self, user1, user2):
        try:
            return self.model.objects.get(Q(creator=user1, receiver=user2) | Q(creator=user2, receiver=user1))
        except self.model.DoesNotExist:
            return None

    def get_incoming(self, user):
        return self.model.objects.filter(receiver=user)
