import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView

api_key = settings.TMDB_API


class MovieMetadataAPIView(APIView):

    def get(self, request, movie_id):
        query = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}"

        response = requests.get(query)
        movie = response.json()

        if movie['poster_path']:
            movie['poster_link_sm'] = f"https://image.tmdb.org/t/p/w154{movie['poster_path']}"
            movie['poster_link_md'] = f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"
            movie['poster_link_og'] = f"https://image.tmdb.org/t/p/original{movie['poster_path']}"
        movie['directors'] = self.get_directors(movie['id'])

        movie['release_year'] = movie['release_date'][0:4]

        return Response(movie)

    def get_directors(self, movie_id):
        query = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={api_key}"
        response = requests.get(query)
        movie_credits = response.json()

        return [dirs for dirs in movie_credits['crew'] if dirs['job'] == 'Director']

