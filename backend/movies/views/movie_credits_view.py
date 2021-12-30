import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView

api_key = settings.TMDB_API


class MovieCreditsAPIView(APIView):

    def get(self, request, movie_id):
        query = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={api_key}"
        response = requests.get(query)
        movie_credits = response.json()

        movie_credits['directors'] = [dirs for dirs in movie_credits['crew'] if dirs['job'] == 'Director']

        return Response(movie_credits)
