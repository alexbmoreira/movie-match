from rest_framework import serializers

from ..models import User, WatchlistMovie


class WatchlistMovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = WatchlistMovie
        fields = ['id', 'movie']

    def create(self, validated_data):
        user = User.objects.get(id=self.context["user_id"])
        watchlist_movie = WatchlistMovie.objects.create(user=user, movie=validated_data.pop('movie'))

        return watchlist_movie
