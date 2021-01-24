from rest_framework import serializers
from random import shuffle

from .models import (FriendRequest, FriendsList, Matchlist, Profile, User,
                     Watchlist)


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class ProfileSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['user']


class FriendsListSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
    friends = serializers.SerializerMethodField()

    class Meta:
        model = FriendsList
        fields = ['user', 'friends']

    def get_friends(self, obj):
        return UserSerializer(obj.friends, many=True).data


class FriendRequestSerializer(serializers.ModelSerializer):

    creator = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['id', 'creator', 'receiver', 'active']


class WatchListSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Watchlist
        fields = ['user', 'watchlist']


class JointWatchListSerializer(serializers.ModelSerializer):

    joint_watchlist = serializers.SerializerMethodField()

    class Meta:
        model = Matchlist
        fields = ['joint_watchlist']

    def get_joint_watchlist(self, obj):
        shared = [movie for movie in obj.shared_watchlist]
        indiv = [movie for movie in obj.indiv_watchlist]
        shuffle(shared)
        shuffle(indiv)

        return shared + indiv


class MatchListSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
    friend = UserSerializer(read_only=True)

    class Meta:
        model = Matchlist
        fields = ['user', 'likes', 'dislikes', 'friend', 'matches']
