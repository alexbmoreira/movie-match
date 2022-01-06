from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..serializers import WatchlistMovieSerializer


class WatchlistView(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]
    serializer_class = WatchlistMovieSerializer
    lookup_field = 'movie'

    def get_queryset(self):
        return self.request.user.watchlist.all()
