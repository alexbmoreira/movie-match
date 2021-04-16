from random import shuffle

from rest_framework import serializers

from .models import (FriendRequest, Friendship, MatchlistDislike,
                     MatchlistLike, Profile, User, WatchlistMovie)


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class ProfileSerializer(serializers.ModelSerializer):

    user_id = serializers.ReadOnlyField(source='user.id')
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Profile
        fields = ['user_id', 'username']


class FriendRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = FriendRequest
        fields = ['id', 'creator', 'receiver', 'active']


class FriendshipSerializer(serializers.ModelSerializer):

    friend = serializers.SerializerMethodField()

    class Meta:
        model = Friendship
        fields = ['id', 'friend']

    def get_friend(self, obj):
        user_id = self.context["user_id"]
        user = obj.friend if obj.friend.id != user_id else obj.user
        return ProfileSerializer(user.profile).data


class WatchlistMovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = WatchlistMovie
        fields = ['id', 'movie']

    def create(self, validated_data):
        user = User.objects.get(id=self.context["user_id"])
        watchlist_movie = WatchlistMovie.objects.create(user=user, movie=validated_data.pop('movie'))

        return watchlist_movie


class MatchlistLikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = MatchlistLike
        fields = ['id', 'friend', 'movie']

    def create(self, validated_data):
        user = User.objects.get(id=self.context['user_id'])
        friend = validated_data.pop('friend')
        watchlist_movie = MatchlistLike.objects.create(user=user, friend=friend, movie=validated_data.pop('movie'))

        return watchlist_movie


class MatchlistDislikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = MatchlistDislike
        fields = ['id', 'friend', 'movie']

    def create(self, validated_data):
        user = User.objects.get(id=self.context['user_id'])
        friend = validated_data.pop('friend')
        watchlist_movie = MatchlistDislike.objects.create(user=user, friend=friend, movie=validated_data.pop('movie'))

        return watchlist_movie
