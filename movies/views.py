import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView

api_key = settings.TMDB_API


class MovieSearchAPIView(APIView):

    def get(self, request, search, page=1):
        query = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={search}&page={page}"

        response = requests.get(query)
        movies = response.json()
        return Response(movies)


class ActorSearchAPIView(APIView):

    def get(self, request, search, page=1):
        query = f"https://api.themoviedb.org/3/search/person?api_key={api_key}&query={search}&page={page}"

        response = requests.get(query)
        actors = response.json()
        actors['results'] = [actor for actor in actors['results'] if actor['known_for_department'] == "Acting"]
        return Response(actors)


class CrewSearchAPIView(APIView):

    def get(self, request, search, page=1):
        query = f"https://api.themoviedb.org/3/search/person?api_key={api_key}&query={search}&page={page}"

        response = requests.get(query)
        actors = response.json()
        actors['results'] = [actor for actor in actors['results'] if actor['known_for_department'] != "Acting"]
        return Response(actors)


class MovieMetadataAPIView(APIView):

    def get(self, request, movie_id):
        query = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}"

        response = requests.get(query)
        movie = response.json()
        return Response(movie)


class PersonMetadataAPIView(APIView):

    def get(self, request, person_id):
        query = f"https://api.themoviedb.org/3/person/{person_id}?api_key={api_key}"

        response = requests.get(query)
        person = response.json()
        return Response(person)
