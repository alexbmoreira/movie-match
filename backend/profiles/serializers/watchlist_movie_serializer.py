from rest_framework import serializers

from ..interactions.watchlist import CreateWatchlistMovie
from ..models import WatchlistMovie


class WatchlistMovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = WatchlistMovie
        fields = ['id', 'movie']

    def create(self, validated_data):
        user = self.context['request'].user
        return CreateWatchlistMovie.run(user=user, **validated_data)
