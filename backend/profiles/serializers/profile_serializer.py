from rest_framework import serializers

from ..models import Profile, Friendship
from .watchlist_movie_serializer import WatchlistMovieSerializer
from .user_serializer import UserSerializer


class ProfileSerializer(serializers.ModelSerializer):

    user = UserSerializer()
    watchlist = WatchlistMovieSerializer(many=True, source="user.watchlist")
    friends = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['user', 'watchlist', 'friends']

    def get_friends(self, obj):
        return UserSerializer(Friendship.objects.get_friends(obj.user), many=True).data
