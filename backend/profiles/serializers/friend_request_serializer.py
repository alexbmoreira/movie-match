from rest_framework import serializers

from ..models import FriendRequest
from .user_serializer import UserSerializer


class FriendRequestSerializer(serializers.ModelSerializer):
    creator = UserSerializer(many=False, read_only=True)
    receiver = UserSerializer(many=False, read_only=True)

    class Meta:
        model = FriendRequest
        fields = [
            'id', 'creator', 'receiver', 'receiver_id'
        ]
        extra_kwargs = {
            'receiver_id': {'source': 'receiver', 'write_only': True},
        }

    def create(self, validated_data):
        validated_data['creator_id'] = self.context['request'].user.id
        return FriendRequest.objects.create(**validated_data)
