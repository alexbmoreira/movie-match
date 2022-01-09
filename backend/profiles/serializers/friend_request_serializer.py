from rest_framework import serializers

from ..interactions import friend_request
from ..models import FriendRequest
from .simple_user_serializer import SimpleUserSerializer


class FriendRequestSerializer(serializers.ModelSerializer):
    creator = SimpleUserSerializer(many=False, read_only=True)
    receiver = SimpleUserSerializer(many=False, read_only=True)

    class Meta:
        model = FriendRequest
        fields = [
            'id', 'creator', 'receiver',
            'creator_id', 'receiver_id'
        ]
        extra_kwargs = {
            'creator_id': {'source': 'creator', 'write_only': True},
            'receiver_id': {'source': 'receiver', 'write_only': True},
        }

    def create(self, validated_data):
        print(validated_data)
        return FriendRequest.objects.create(**validated_data)
