from random import shuffle

from rest_framework import serializers

from .models import FriendRequest, Profile, User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class ProfileSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['user']


class FriendRequestSerializer(serializers.ModelSerializer):

    creator = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['id', 'creator', 'receiver', 'active']
