import requests
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings

class MovieSearchAPIView(APIView):

    def get(self, request, search, page=1):
        api_key = settings.TMDB_API

        response = requests.get(f" https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={search}&page={page}")
        movie = response.json()
        return Response(movie)

