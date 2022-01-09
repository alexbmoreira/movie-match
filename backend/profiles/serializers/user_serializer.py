from rest_framework import serializers

from ..models import Friendship, User
from .simple_user_serializer import SimpleUserSerializer
from .watchlist_movie_serializer import WatchlistMovieSerializer


class UserSerializer(serializers.ModelSerializer):

    watchlist = WatchlistMovieSerializer(many=True)
    friends = serializers.SerializerMethodField()
    is_friend = serializers.SerializerMethodField()
    is_friend_requested = serializers.SerializerMethodField()
    is_friend_requesting = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'avatar_color',
            'is_friend',
            'is_friend_requested',
            'is_friend_requesting',
            'watchlist',
            'friends'
        ]

    def get_friends(self, obj):
        return SimpleUserSerializer(Friendship.objects.get_friends(obj), many=True).data
