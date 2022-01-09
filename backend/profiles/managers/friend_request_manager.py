from django.db import models
from django.db.models import Q
from django.shortcuts import get_object_or_404


class FriendRequestManager(models.Manager):

    def get_friend_requests(self, user):
        return self.model.objects.filter(Q(creator=user) | Q(receiver=user))

    def get_friend_request(self, user1, user2):
        friend_request = get_object_or_404(self.model, Q(creator=user1, receiver=user2) | Q(creator=user2, receiver=user1))

        return friend_request
