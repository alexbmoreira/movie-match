from django.db import models

from ..managers import FriendshipManager
from .user import User


class Friendship(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_friendships')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name='received_friendships')

    objects = FriendshipManager()

    class Meta:
        unique_together = ['user', 'friend']

    def __str__(self):
        return f"({self.id}) {self.user.username} is friends with {self.friend.username}"
