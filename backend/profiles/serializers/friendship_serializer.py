from rest_framework import serializers

from ..models import Friendship
from .simple_user_serializer import SimpleUserSerializer


class FriendshipSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(many=False, read_only=True)
    friend = SimpleUserSerializer(many=False, read_only=True)

    class Meta:
        model = Friendship
        fields = ['id', 'user', 'friend']
