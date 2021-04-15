from random import shuffle

from rest_framework import serializers

from .models import FriendRequest, Friendship, Profile, User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class ProfileSerializer(serializers.ModelSerializer):

    user_id = serializers.ReadOnlyField(source='user.id')
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Profile
        fields = ['user_id', 'username']


class FriendRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = FriendRequest
        fields = ['id', 'creator', 'receiver', 'active']


class FriendshipSerializer(serializers.ModelSerializer):

    friend = ProfileSerializer(source='friend')

    class Meta:
        model = Friendship
        fields = ['id', 'friend']
