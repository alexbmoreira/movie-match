from rest_framework import serializers

from ..models import MatchlistLike, User


class MatchlistLikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = MatchlistLike
        fields = ['id', 'friend', 'movie']

    def create(self, validated_data):
        user = User.objects.get(id=self.context['user_id'])
        friend = validated_data.pop('friend')
        watchlist_movie = MatchlistLike.objects.create(user=user, friend=friend, movie=validated_data.pop('movie'))

        return watchlist_movie
