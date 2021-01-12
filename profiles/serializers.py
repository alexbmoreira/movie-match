from rest_framework import serializers
from .models import User, Profile, FriendsList


class ProfileSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Profile
        fields = ['user']


class FriendsListSerializer(serializers.ModelSerializer):

    friends = serializers.SerializerMethodField()

    class Meta:
        model = FriendsList
        fields = ['friends']

    def get_friends(self, obj):
        return UserSerializer(obj.friends, many=True).data


# class ProfileDetailSerializer(serializers.ModelSerializer):

#     user = serializers.StringRelatedField(read_only=True)
#     friendships = serializers.SerializerMethodField()

#     class Meta:
#         model = Profile
#         fields = ['user', 'friendships']

#     def get_friendships(self, obj):
#         return ProfileFriendshipSerializer(obj).data


# class ProfileFriendshipSerializer(serializers.ModelSerializer):

#     friends = serializers.SerializerMethodField()
#     incoming_requests = serializers.SerializerMethodField()
#     sent_requests = serializers.SerializerMethodField()

#     class Meta:
#         model = Profile
#         fields = ['friends', 'incoming_requests', 'sent_requests']

#     def get_friends(self, obj):
#         return UserSerializer(obj.get_friends(), many=True).data

#     def get_incoming_requests(self, obj):
#         return UserSerializer(obj.get_incoming_requests(), many=True).data

#     def get_sent_requests(self, obj):
#         return UserSerializer(obj.get_sent_requests(), many=True).data


# class FriendshipSerializer(serializers.ModelSerializer):

#     creator = serializers.StringRelatedField(read_only=True)
#     friend = serializers.StringRelatedField(read_only=True)

#     class Meta:
#         model = Friendship
#         fields = ['creator', 'friend']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']
