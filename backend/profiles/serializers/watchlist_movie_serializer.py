from rest_framework import serializers

from ..models import WatchlistMovie


class WatchlistMovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = WatchlistMovie
        fields = ['id', 'movie']

    def create(self, validated_data):
        user = self.context['request'].user
        return WatchlistMovie.objects.create(user=user, **validated_data)
