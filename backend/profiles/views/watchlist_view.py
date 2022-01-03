from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..interactions.watchlist import DestroyWatchlistMovie
from ..models import WatchlistMovie
from ..serializers import WatchlistMovieSerializer


class WatchlistView(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = WatchlistMovieSerializer(data=request.data, context={'user': request.user})

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        movie = get_object_or_404(WatchlistMovie, user=request.user, **request.data)
        DestroyWatchlistMovie.run(movie=movie)
        return Response(status=status.HTTP_204_NO_CONTENT)
