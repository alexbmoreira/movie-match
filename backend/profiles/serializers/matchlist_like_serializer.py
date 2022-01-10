from rest_framework import serializers

from ..models import MatchlistLike, User


class MatchlistLikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = MatchlistLike
        fields = ['id', 'friend', 'movie']
        read_only_fields = ['friend']

    def create(self, validated_data):
        user = self.context['request'].user
        friend = User.objects.get(id=self.context['user_id'])
        return MatchlistLike.objects.create(user=user, friend=friend, **validated_data)
