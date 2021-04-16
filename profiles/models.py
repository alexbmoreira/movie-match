from django.contrib.auth.models import User
from django.db import models

from .managers import ProfileManager


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    objects = ProfileManager()

    def __str__(self):
        return f"({self.user.id}) {self.user.username}"


class Friendship(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_friendships')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name='received_friendships')

    class Meta:
        unique_together = ['user', 'friend']

    def __str__(self):
        return f"({self.id}) {self.user.username} is friends with {self.friend.username}"


class FriendRequest(models.Model):

    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_requests')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')
    active = models.BooleanField(default=True)

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


class MatchlistLike(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matchlist_likes')
    friend = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.IntegerField(blank=True, default=list)

    class Meta:
        unique_together = ['user', 'friend', 'movie']

    def __str__(self):
        return f"({self.id}) {self.user} liked {self.movie} in their matchlist with {self.friend}"


class MatchlistDislike(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matchlist_dislikes')
    friend = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.IntegerField(blank=True, default=list)

    class Meta:
        unique_together = ['user', 'friend', 'movie']

    def __str__(self):
        return f"({self.id}) {self.user} disliked {self.movie} in their matchlist with {self.friend}"


class WatchlistMovie(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.IntegerField(blank=True, default=list)

    class Meta:
        unique_together = ['user', 'movie']

    def __str__(self):
        return f"({self.id}) {self.user} wants to watch {self.movie}"
