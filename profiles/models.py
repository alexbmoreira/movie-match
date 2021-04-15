from datetime import timedelta

from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.dispatch import Signal
from django.utils import timezone


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Friendship(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_friendships')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name='received_friendships')

    def __str__(self):
        return f"{self.user.username} is friends with {self.friend.username}"


class FriendRequest(models.Model):

    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_requests')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')
    active = models.BooleanField(default=True)

    def accept(self):
        Friendship.objects.create(user=creator, friend=receiver)
        self.active = False
        self.delete()

    def decline(self):
        self.active = False
        self.delete()

    def cancel(self):
        self.active = False
        self.delete()


class MatchlistLike(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matchlist_likes')
    friend = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.IntegerField(blank=True, default=list)

    def __str__(self):
        return f"{self.user} liked {self.movie} in their matchlist with {self.friend}"


class MatchlistDislike(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matchlist_dislikes')
    friend = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.IntegerField(blank=True, default=list)

    def __str__(self):
        return f"{self.user} disliked {self.movie} in their matchlist with {self.friend}"


class WatchlistMovie(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.IntegerField(blank=True, default=list)

    def __str__(self):
        return f"{self.user} wants to watch {self.movie}"
