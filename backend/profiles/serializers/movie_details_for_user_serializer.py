from rest_framework import serializers

from ..models import User, WatchlistMovie


class MovieDetailsForUserSerializer(serializers.ModelSerializer):

    movie_id = serializers.SerializerMethodField()
    in_watchlist = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'movie_id', 'in_watchlist']

    def get_movie_id(self, obj):
        return self.context['movie_id']

    def get_in_watchlist(self, obj):
        movie_id = self.context['movie_id']
        return WatchlistMovie.objects.filter(user=obj, movie=movie_id).exists()
