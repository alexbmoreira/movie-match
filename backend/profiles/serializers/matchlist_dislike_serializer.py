from rest_framework import serializers

from ..models import MatchlistDislike, User


class MatchlistDislikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = MatchlistDislike
        fields = ['id', 'friend', 'movie']
        read_only_fields = ['friend']

    def create(self, validated_data):
        user = self.context['request'].user
        friend = User.objects.get(id=self.context['user_id'])
        return MatchlistDislike.objects.create(user=user, friend=friend, **validated_data)
