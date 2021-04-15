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

    friend = serializers.SerializerMethodField()

    class Meta:
        model = Friendship
        fields = ['id', 'friend']

    def get_friend(self, obj):
        user_id = self.context.get("user_id")
        user = obj.friend if obj.friend.id != user_id else obj.user
        return ProfileSerializer(user.profile).data
