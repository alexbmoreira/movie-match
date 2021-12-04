from rest_framework import serializers

from ..interactions.watchlist_movie import CreateWatchlistMovie
from ..models import User, WatchlistMovie


class WatchlistMovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = WatchlistMovie
        fields = ['id', 'movie']

    def create(self, validated_data):
        user = self.context['user']
        return CreateWatchlistMovie.run(user=user, **validated_data)
