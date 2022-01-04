from django.shortcuts import get_object_or_404
from rest_framework import generics, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..interactions.watchlist import DestroyWatchlistMovie
from ..models import WatchlistMovie
from ..serializers import WatchlistMovieSerializer


class WatchlistView(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]
    serializer_class = WatchlistMovieSerializer
    lookup_field = 'movie'

    def get_queryset(self):
        return self.request.user.watchlist.all()
