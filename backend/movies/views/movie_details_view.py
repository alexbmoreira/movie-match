from rest_framework.response import Response
from rest_framework.views import APIView

from .tmdb_api_view import TmdbAPIView, TmdbRetrieveAPIView


class MovieMetadataAPIView(APIView):

    def get(self, request, movie_id):
        cached = TmdbAPIView.is_cached(request, 'movie_details', movie_id=movie_id)

        if not cached:
            movie = TmdbRetrieveAPIView.make_request(f'movie/{movie_id}')

            if movie['poster_path']:
                movie['poster_link_sm'] = TmdbAPIView.get_image('w154', movie['poster_path'])
                movie['poster_link_md'] = TmdbAPIView.get_image('w500', movie['poster_path'])
                movie['poster_link_og'] = TmdbAPIView.get_image('original', movie['poster_path'])
            movie['directors'] = self.get_directors(movie['id'])

            movie['release_year'] = movie['release_date'][0:4]

            TmdbAPIView.set_cache(request, 'movie_details', movie, movie_id=movie_id)

        return Response(request.session['movie_details'])

    def get_directors(self, movie_id):
        movie_credits = TmdbRetrieveAPIView.make_request(f'movie/{movie_id}/credits')

        return [dirs for dirs in movie_credits['crew'] if dirs['job'] == 'Director']

