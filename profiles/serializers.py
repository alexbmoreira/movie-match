from rest_framework import serializers
from .models import Profile, Friendship, User


class ProfileSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Profile
        fields = ['user']

class ProfileDetailSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField(read_only=True)
    friends = serializers.SerializerMethodField()
    incoming_requests = serializers.SerializerMethodField()
    sent_requests = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['user', 'friends', 'incoming_requests', 'sent_requests']

    def get_friends(self, obj):
        return UserSerializer(obj.get_friends(), many=True).data

    def get_incoming_requests(self, obj):
        return UserSerializer(obj.get_incoming_requests(), many=True).data

    def get_sent_requests(self, obj):
        return UserSerializer(obj.get_sent_requests(), many=True).data


class FriendshipSerializer(serializers.ModelSerializer):

    creator = serializers.StringRelatedField(read_only=True)
    friend = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Friendship
        fields = ['creator', 'friend']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username']
