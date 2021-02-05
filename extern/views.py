import requests
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .utils import Letterboxd


class LetterboxdWatchlistAPIView(APIView):

    def get(self, request, username):
        watchlist = Letterboxd.get_watchlist(username)

        return Response(watchlist)
