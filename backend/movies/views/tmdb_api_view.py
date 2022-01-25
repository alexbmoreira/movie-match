import sys

import requests
from django.conf import settings
from rest_framework.views import APIView

api_key = settings.TMDB_API


class TmdbAPIView:

    @staticmethod
    def get_image(size, path):
        return f"https://image.tmdb.org/t/p/{size}{path}"

    @staticmethod
    def is_cached(request, action, **kwargs):
        if action not in request.session or sys.getsizeof(request.session[action]) == 0:
            return False

        for key, value in kwargs.items():
            if request.session[action][key] != value:
                return False

        return True

    @staticmethod
    def set_cache(request, action, action_value, **kwargs):
        request.session[action] = action_value

        for key, value in kwargs.items():
            request.session[action][key] = value


class TmdbListAPIView:

    @staticmethod
    def make_request(endpoint, **kwargs):
        params = ''.join([f"&{key}={value}" for key, value in kwargs.items()])

        query = f"https://api.themoviedb.org/3/{endpoint}?api_key={api_key}{params}"
        response = requests.get(query)

        results = response.json()['results']
        total_results = response.json()['total_results']
        total_pages = response.json()['total_pages']

        return {
            'count': total_results,
            'next': True if len(results) < total_results and kwargs.get('page', 0) < total_pages else False,
            'prev': True if kwargs.get('page', 0) > 1 else False,
            'results': results
        }

    @staticmethod
    def set_cache(request, action, action_value, **kwargs):
        request.session[action] = {}
        request.session[action]['results'] = action_value

        for key, value in kwargs.items():
            request.session[action][key] = value


class TmdbRetrieveAPIView:

    @staticmethod
    def make_request(endpoint, **kwargs):
        params = ''.join([f"&{key}={value}" for key, value in kwargs.items()])

        query = f"https://api.themoviedb.org/3/{endpoint}?api_key={api_key}{params}"
        response = requests.get(query)
        return response.json()
