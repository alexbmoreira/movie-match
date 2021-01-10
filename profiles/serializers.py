from rest_framework import serializers
from .models import Profile, Friendship


class ProfileSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Profile
        fields = ['user']

# class ProfileFriendshipSerializer(serializers.ModelSerializer):

#     user = serializers.StringRelatedField(read_only=True)


# class FriendshipSerializer(serializers.ModelSerializer):

#     creator = serializers.StringRelatedField(read_only=True)
#     friend = serializers.StringRelatedField(read_only=True)

#     class Meta:
#         model = Friendship
#         fields = ['creator', 'friend', 'accepted']
