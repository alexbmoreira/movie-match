from rest_framework import serializers

from ..models import WatchlistMovie


class WatchlistMovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = WatchlistMovie
        fields = ['id', 'movie', 'added_at']
        read_only_fields = ['added_at']

    def create(self, validated_data):
        validated_data['user_id'] = self.context['request'].user.id
        return WatchlistMovie.objects.create(**validated_data)
