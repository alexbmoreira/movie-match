from rest_framework import serializers

from ..models import MatchlistLike, User


class MatchlistLikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = MatchlistLike
        fields = ['id', 'friend', 'movie']
        read_only_fields = ['friend']

    def create(self, validated_data):
        validated_data['user_id'] = self.context['request'].user.id
        validated_data['friend_id'] = self.context['user_id']
        return MatchlistLike.objects.create(**validated_data)
