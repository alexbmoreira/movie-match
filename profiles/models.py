from django.contrib.auth.models import User
from django.db import models
from django.db.models import Q


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def get_friends(self):
        friendship_set = Friendship.objects.filter(accepted=True).filter(Q(creator=self.user) | Q(friend=self.user))

        return [fshp.creator if fshp.friend == self.user else fshp.friend for fshp in friendship_set]

    def get_incoming_requests(self):
        friendship_set = Friendship.objects.filter(accepted=False).filter(friend=self.user)

        return [fshp.creator for fshp in friendship_set]

    def get_sent_requests(self):
        friendship_set = Friendship.objects.filter(accepted=False).filter(creator=self.user)

        return [fshp.friend for fshp in friendship_set]

    def __str__(self):
        return self.user.username


class Friendship(models.Model):
    creator = models.ForeignKey(User, related_name='friendship_creator_set', on_delete=models.CASCADE)
    friend = models.ForeignKey(User, related_name='friendship_friend_set', on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.creator} and {self.friend}"
