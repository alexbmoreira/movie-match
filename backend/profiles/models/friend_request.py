from django.db import models

from ..managers import FriendRequestManager
from .friendship import Friendship
from .user import User


class FriendRequest(models.Model):

    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_requests')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')

    objects = FriendRequestManager()

    class Meta:
        unique_together = ['creator', 'receiver']

    def accept(self):
        Friendship.objects.create(user=self.creator, friend=self.receiver)
        self.active = False
        self.delete()

    def decline(self):
        self.active = False
        self.delete()

    def cancel(self):
        self.active = False
        self.delete()

    def __str__(self):
        return f"({self.id}) {self.creator.username}'s request to {self.receiver.username}"
