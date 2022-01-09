from rest_framework import serializers

from ..models import MatchlistLike


class MatchlistMovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = MatchlistLike
        fields = ['id', 'friend', 'movie']
