from rest_framework import serializers

from ..models import Profile
from .watchlist_movie_serializer import WatchlistMovieSerializer


class ProfileSerializer(serializers.ModelSerializer):

    user_id = serializers.ReadOnlyField(source='user.id')
    username = serializers.ReadOnlyField(source='user.username')
    watchlist = WatchlistMovieSerializer(many=True, source="user.watchlist")

    class Meta:
        model = Profile
        fields = ['user_id', 'username', 'watchlist']
