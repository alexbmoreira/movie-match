import requests
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .utils import Letterboxd
from profiles.models import Watchlist


class LetterboxdWatchlistAPIView(APIView):

    def post(self, request, username, operation="add"):
        watchlist = Letterboxd.get_watchlist(username)

        if "error" not in watchlist:
            user_list = Watchlist.objects.get(user=request.user)

            if operation == "overwrite":
                user_list.watchlist.clear()

            for movie in watchlist:
                if movie["id"] not in user_list.watchlist:
                    user_list.add_movie(movie["id"])

            user_list.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(watchlist, status=status.HTTP_404_NOT_FOUND)
