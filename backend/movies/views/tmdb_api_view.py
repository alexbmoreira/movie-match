import requests
from django.conf import settings
from rest_framework.views import APIView

api_key = settings.TMDB_API


class TmdbAPIView(APIView):

    def make_request(self, endpoint, **kwargs):
        params = ''.join([f"&{key}={value}" for key, value in kwargs.items()])

        query = f"https://api.themoviedb.org/3/{endpoint}?api_key={api_key}{params}"
        response = requests.get(query)
        return response.json()

    def get_image(self, size, path):
        return f"https://image.tmdb.org/t/p/{size}{path}"
