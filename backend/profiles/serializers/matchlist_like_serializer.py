from rest_framework import serializers

from ..models import MatchlistLike, User


class MatchlistLikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = MatchlistLike
        fields = ['id', 'friend', 'movie']

    def create(self, validated_data):
        user = self.context['request'].user
        return MatchlistLike.objects.create(user=user, **validated_data)
