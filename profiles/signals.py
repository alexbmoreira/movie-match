from django.contrib.auth.models import User
from django.db.models import Q
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import (FriendRequest, FriendsList, Matchlist, Profile, Watchlist,
                     friendslist_updated, matchlist_updated, watchlist_updated)


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
        if not Matchlist.objects.filter(user=user):
            m_l = Matchlist.objects.create(user=user, friend=friend)
            m_l.save()
        if not Matchlist.objects.filter(user=friend):
            m_l = Matchlist.objects.create(user=friend, friend=user)
            m_l.save()

    if action == 'remove':
        Matchlist.objects.filter(Q(user=user, friend=friend) | Q(user=friend, friend=user)).delete()


@receiver(watchlist_updated, sender=Watchlist)
def update_watchlist(user, **kwargs):
    m_lists = Matchlist.objects.filter(Q(user=user) | Q(friend=user))
    for m_l in m_lists:
        m_l.save()


@receiver(matchlist_updated, sender=Matchlist)
def update_matchlist(user, friend, **kwargs):
    m_list1 = Matchlist.objects.get(user=user, friend=friend)
    m_list2 = Matchlist.objects.get(user=friend, friend=user)

    m_list1.get_matches()
    m_list2.get_matches()
