from rest_framework import serializers

from .models import (FriendRequest, FriendsList, JointWatchlist, Profile, User,
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

    user1 = UserSerializer(read_only=True)
    user2 = UserSerializer(read_only=True)

    class Meta:
        model = JointWatchlist
        fields = ['user1', 'user2', 'shared_watchlist', 'indiv_watchlist']
