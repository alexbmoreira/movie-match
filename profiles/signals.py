from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import (FriendRequest, FriendsList, JointWatchlist, Profile,
                     Watchlist, friend_request_accepted, movie_added)


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):

    if created:
        FriendsList.objects.create(user=instance)
        Profile.objects.create(user=instance)
        Watchlist.objects.create(user=instance)
        instance.save()


@receiver(friend_request_accepted, sender=FriendRequest)
def my_receiver(creator, receiver, **kwargs):
    j_w = JointWatchlist.objects.create(user1=creator, user2=receiver)
    j_w.save()
