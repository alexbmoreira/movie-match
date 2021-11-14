from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import WatchlistMovie
from ..serializers import ProfileSerializer, WatchlistMovieSerializer


class WatchlistAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        watchlist = request.user.watchlistmovie_set.all()
        serializer = WatchlistMovieSerializer(watchlist, many=True)
        data = {}
        data['user'] = ProfileSerializer(request.user.profile).data
        data['watchlist'] = serializer.data
        return Response(data=data)

    def post(self, request):
        serializer = WatchlistMovieSerializer(data=request.data, context={'user_id': request.user.id})

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        watchlist_movie = get_object_or_404(WatchlistMovie, id=request.data['id'])
        watchlist_movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
