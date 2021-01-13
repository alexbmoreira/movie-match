from rest_framework import serializers
from .models import User, Profile, FriendsList, FriendRequest


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
        model = FriendsList
        fields = ['creator', 'receiver', 'active']

