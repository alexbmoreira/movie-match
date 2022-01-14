from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from ..models import WatchlistMovie
from ..serializers import WatchlistMovieSerializer


class WatchlistView(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]
    serializer_class = WatchlistMovieSerializer
    lookup_field = 'movie_id'

    def get_queryset(self):
        return WatchlistMovie.objects.filter(user=self.kwargs['user_id'])

    def get_object(self):
        try:
            return WatchlistMovie.objects.get(user=self.request.user, movie=self.kwargs['movie_id'])
        except WatchlistMovie.DoesNotExist:
            return None
