from rest_framework import serializers

from ..interactions import watchlist
from ..models import WatchlistMovie


class WatchlistMovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = WatchlistMovie
        fields = ['id', 'movie']

    def create(self, validated_data):
        user = self.context['request'].user
        return watchlist.CreateWatchlistMovie.run(user=user, **validated_data)
