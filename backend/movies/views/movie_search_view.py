from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .tmdb_api_view import TmdbAPIView, TmdbListAPIView, TmdbRetrieveAPIView


class MovieSearchAPIView(APIView):

    def get(self, request):
        search = request.GET.get('search', '')
        page = int(request.GET.get('page', 1))

        if search == '':
            return Response(data={'error': 'search param required'}, status=status.HTTP_400_BAD_REQUEST)

        cached = TmdbAPIView.is_cached(request, 'movie_search', search=search, page=page)

        if not cached:
            movies = TmdbListAPIView.make_request('search/movie', query=search, page=page)

            for movie in movies['results']:
                if movie['poster_path']:
                    movie['poster_link_sm'] = TmdbAPIView.get_image('w154', movie['poster_path'])
                    movie['poster_link_md'] = TmdbAPIView.get_image('w500', movie['poster_path'])
                    movie['poster_link_og'] = TmdbAPIView.get_image('original', movie['poster_path'])
                movie['directors'] = self.get_directors(movie['id'])
                movie['release_year'] = movie['release_date'][0:4] if 'release_date' in movie else ''
                movie['type'] = 'movie'

            TmdbAPIView.set_cache(request, 'movie_search', movies, search=search, page=page)

        return Response(request.session['movie_search'])

    def get_directors(self, movie_id):
        movie_credits = TmdbRetrieveAPIView.make_request(f"movie/{movie_id}/credits")

        return [dirs for dirs in movie_credits['crew'] if dirs['job'] == 'Director']
