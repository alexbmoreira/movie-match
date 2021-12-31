import sys

from rest_framework import status
from rest_framework.response import Response

from .tmdb_api_view import TmdbAPIView


class MovieSearchAPIView(TmdbAPIView):

    def get(self, request):
        search = request.GET.get('search', '')
        page = int(request.GET.get('page', 1))

        if search == '':
            return Response(data={'error': 'search param required'}, status=status.HTTP_400_BAD_REQUEST)

        cached = 'movie_search' in request.session and \
            sys.getsizeof(request.session['movie_search']) > 0 and \
            request.session['movie_search']['search'] == search and \
            request.session['movie_search']['page'] == page

        if not cached:
            movies = self.make_request('search/movie', query=search, page=page)

            for movie in movies['results']:
                if movie['poster_path']:
                    movie['poster_link_sm'] = f"https://image.tmdb.org/t/p/w154{movie['poster_path']}"
                    movie['poster_link_md'] = f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"
                    movie['poster_link_og'] = f"https://image.tmdb.org/t/p/original{movie['poster_path']}"
                movie['directors'] = self.get_directors(movie['id'])
                movie['release_year'] = movie['release_date'][0:4] if 'release_date' in movie else ''
                movie['type'] = 'movie'

            request.session['movie_search'] = movies
            request.session['movie_search']['search'] = search
            request.session['movie_search']['page'] = page

        return Response(request.session['movie_search'])

    def get_directors(self, movie_id):
        movie_credits = self.make_request(f"movie/{movie_id}/credits")

        return [dirs for dirs in movie_credits['crew'] if dirs['job'] == 'Director']
