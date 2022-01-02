from rest_framework import serializers

from ..models import Friendship, User
from .simple_user_serializer import SimpleUserSerializer
from .watchlist_movie_serializer import WatchlistMovieSerializer


class UserSerializer(serializers.ModelSerializer):

    watchlist = WatchlistMovieSerializer(many=True)
    friends = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar_color', 'watchlist', 'friends']

    def get_friends(self, obj):
        return SimpleUserSerializer(Friendship.objects.get_friends(obj), many=True).data
