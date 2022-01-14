from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from ..models import User, WatchlistMovie


class WatchlistMovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = WatchlistMovie
        fields = ['id', 'movie']

    def create(self, validated_data):
        user = get_object_or_404(User, id=self.context['view'].kwargs['user_id'])
        return WatchlistMovie.objects.create(user=user, **validated_data)
