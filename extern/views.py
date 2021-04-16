import requests
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .utils import Letterboxd
from profiles.models import WatchlistMovie


class LetterboxdWatchlistAPIView(APIView):

    def post(self, request, username):
        operation = request.GET.get('operation', '')
        watchlist = Letterboxd.get_watchlist(username)

        if "error" not in watchlist:
            user_list = request.user.watchlistmovie_set.all()

            if operation == "overwrite":
                user_list.delete()

            watchlist_movies = []
            for movie in watchlist:
                try:
                    watchlist_movies.append(WatchlistMovie(user=request.user, movie=movie['id']))
                except:
                    pass

            WatchlistMovie.objects.bulk_create(watchlist_movies, ignore_conflicts=True)
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(watchlist, status=status.HTTP_404_NOT_FOUND)
