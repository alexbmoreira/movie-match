from rest_framework import serializers

from ..models import FriendRequest
from .simple_user_serializer import SimpleUserSerializer


class FriendRequestSerializer(serializers.ModelSerializer):
    creator = SimpleUserSerializer(many=False, read_only=True)
    receiver = SimpleUserSerializer(many=False, read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['id', 'creator', 'receiver']
