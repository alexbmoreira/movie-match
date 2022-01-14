from rest_framework import serializers

from ..models import Friendship
from .user_serializer import UserSerializer


class FriendshipSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    friend = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Friendship
        fields = ['id', 'user', 'friend']
