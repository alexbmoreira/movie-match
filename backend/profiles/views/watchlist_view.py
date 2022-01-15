from rest_framework import viewsets

from ..models import WatchlistMovie
from ..permissions import IsUser
from ..serializers import WatchlistMovieSerializer


class WatchlistView(viewsets.ModelViewSet):

    permission_classes = [IsUser]
    serializer_class = WatchlistMovieSerializer
    lookup_field = 'movie_id'

    def get_queryset(self):
        return WatchlistMovie.objects.filter(user=self.kwargs['user_id'])

    def get_object(self):
        breakpoint
        try:
            return WatchlistMovie.objects.get(user=self.kwargs['user_id'], movie=self.kwargs['movie_id'])
        except WatchlistMovie.DoesNotExist:
            return None
