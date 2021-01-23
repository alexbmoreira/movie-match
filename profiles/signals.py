from django.contrib.auth.models import User
from django.db.models import Q
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import (FriendRequest, FriendsList, JointWatchlist, Profile,
                     Watchlist, friendslist_updated, watchlist_updated)


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):

    if created:
        FriendsList.objects.create(user=instance)
        Profile.objects.create(user=instance)
        Watchlist.objects.create(user=instance)
        instance.save()


@receiver(friendslist_updated, sender=FriendsList)
def update_friendslist(user, friend, action, **kwargs):
    if action == 'add':
        if not JointWatchlist.objects.filter(Q(user1=user, user2=friend) | Q(user1=friend, user2=user)):
            j_w = JointWatchlist.objects.create(user1=user, user2=friend)
            j_w.save()
    if action == 'remove':
        JointWatchlist.objects.filter(Q(user1=user, user2=friend) | Q(user1=friend, user2=user)).delete()


@receiver(watchlist_updated, sender=Watchlist)
def update_watchlist(user, **kwargs):
    watchlists = JointWatchlist.objects.filter(Q(user1=user) | Q(user2=user))
    for j_w in watchlists:
        j_w.save()
