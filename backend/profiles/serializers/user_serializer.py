from django.db.models import Q
from rest_framework import serializers

from ..models import Friendship, User
from .simple_user_serializer import SimpleUserSerializer
from .watchlist_movie_serializer import WatchlistMovieSerializer


class UserSerializer(serializers.ModelSerializer):

    watchlist = WatchlistMovieSerializer(many=True)
    friends = serializers.SerializerMethodField()
    is_friend = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar_color', 'is_friend', 'watchlist', 'friends']

    def get_friends(self, obj):
        return SimpleUserSerializer(Friendship.objects.get_friends(obj), many=True).data

    def get_is_friend(self, obj):
        user = self.context['request'].user
        if user in Friendship.objects.get_friends(obj):
            return True
        return False
