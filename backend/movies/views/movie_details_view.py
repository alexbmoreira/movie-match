from rest_framework.response import Response

from .tmdb_api_view import TmdbAPIView


class MovieMetadataAPIView(TmdbAPIView):

    def get(self, request, movie_id):
        movie = self.make_request(f"movie/{movie_id}")

        if movie['poster_path']:
            movie['poster_link_sm'] = self.get_image('w154', movie['poster_path'])
            movie['poster_link_md'] = self.get_image('w500', movie['poster_path'])
            movie['poster_link_og'] = self.get_image('original', movie['poster_path'])
        movie['directors'] = self.get_directors(movie['id'])

        movie['release_year'] = movie['release_date'][0:4]

        return Response(movie)

    def get_directors(self, movie_id):
        movie_credits = self.make_request(f"movie/{movie_id}/credits")

        return [dirs for dirs in movie_credits['crew'] if dirs['job'] == 'Director']

