import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView


class MovieSearchAPIView(APIView):

    def get(self, request, search, page=1):
        api_key = settings.TMDB_API

        query = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={search}&page={page}"

        response = requests.get(query)
        movie = response.json()
        return Response(movie)
