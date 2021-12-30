import sys

import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView

api_key = settings.TMDB_API


class PopularMoviesAPIView(APIView):

    def get(self, request, page=1):
        cached = 'popular' in request.session and \
            sys.getsizeof(request.session['popular']) > 0 and \
            request.session['popular']['page'] == page

        if not cached:
            query = f"https://api.themoviedb.org/3/movie/popular?api_key={api_key}&page={page}"
            response = requests.get(query)
            movies = response.json()

            for movie in movies['results']:
                if movie['poster_path']:
                    movie['poster_link_sm'] = f"https://image.tmdb.org/t/p/w154{movie['poster_path']}"
                    movie['poster_link_md'] = f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"
                    movie['poster_link_og'] = f"https://image.tmdb.org/t/p/original{movie['poster_path']}"
                movie['directors'] = self.get_directors(movie['id'])
                movie['release_year'] = movie['release_date'][0:4] if 'release_date' in movie else ''
                movie['type'] = 'movie'

            request.session['popular'] = movies

        return Response(request.session['popular'])

    def get_directors(self, movie_id):
        query = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={api_key}"
        response = requests.get(query)
        movie_credits = response.json()

        return [dirs for dirs in movie_credits['crew'] if dirs['job'] == 'Director']

