import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView

api_key = settings.TMDB_API


class MovieSearchAPIView(APIView):

    def get(self, request, search, page=1):
        cached = 'movie_search' in request.session and request.session['movie_search']['search'] == search and request.session['movie_search']['page'] == page

        if not cached:
            query = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={search}&page={page}"
            response = requests.get(query)
            movies = response.json()
            request.session['movie_search'] = movies
            request.session['movie_search']['search'] = search

        return Response(request.session['movie_search'])


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

        person['credits'] = self.sort_credits(person_id, person['known_for_department'])
        return Response(person)

    def sort_credits(self, person_id, known_for):
        query = f"https://api.themoviedb.org/3/person/{person_id}/movie_credits?api_key={api_key}"
        response = requests.get(query)
        person_credits = response.json()

        credit_list = "cast" if known_for != "Acting" else "crew"
        person_credits['known_for_credits'] = sorted(
            person_credits[credit_list],
            key=lambda k: k['popularity'],
            reverse=True)[0:10]

        return person_credits


class PopularMoviesAPIView(APIView):

    def get(self, request, page=1):
        cached = 'popular' in request.session and request.session['popular']['page'] == page

        if not cached:
            query = f"https://api.themoviedb.org/3/movie/popular?api_key={api_key}&page={page}"
            response = requests.get(query)
            movies = response.json()
            request.session['popular'] = movies

        return Response(request.session['popular'])
