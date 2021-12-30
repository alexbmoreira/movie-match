import sys

import requests
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

api_key = settings.TMDB_API


class MovieSearchAPIView(APIView):

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
            query = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={search}&page={page}"
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

            request.session['movie_search'] = movies
            request.session['movie_search']['search'] = search
            request.session['movie_search']['page'] = page

        return Response(request.session['movie_search'])

    def get_directors(self, movie_id):
        query = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={api_key}"
        response = requests.get(query)
        movie_credits = response.json()

        return [dirs for dirs in movie_credits['crew'] if dirs['job'] == 'Director']


class ActorSearchAPIView(APIView):

    def get(self, request):
        search = request.GET.get('search', '')
        page = int(request.GET.get('page', 1))

        if search == '':
            return Response(data={'error': 'search param required'}, status=status.HTTP_400_BAD_REQUEST)

        cached = 'actor_search' in request.session and \
            sys.getsizeof(request.session['actor_search']) > 0 and \
            request.session['actor_search']['search'] == search and \
            request.session['actor_search']['page'] == page

        if not cached:
            query = f"https://api.themoviedb.org/3/search/person?api_key={api_key}&query={search}&page={page}"
            response = requests.get(query)
            actors = response.json()
            actors['results'] = [actor for actor in actors['results'] if actor['known_for_department'] == "Acting"]

            for actor in actors['results']:
                if actor['profile_path']:
                    actor['profile_link_sm'] = f"https://image.tmdb.org/t/p/w154{actor['profile_path']}"
                    actor['profile_link_md'] = f"https://image.tmdb.org/t/p/w500{actor['profile_path']}"
                    actor['profile_link_og'] = f"https://image.tmdb.org/t/p/original{actor['profile_path']}"
                actor['type'] = 'actor'

            request.session['actor_search'] = actors
            request.session['actor_search']['search'] = search
            request.session['actor_search']['page'] = page

        return Response(request.session['actor_search'])


class CrewSearchAPIView(APIView):

    def get(self, request):
        search = request.GET.get('search', '')
        page = int(request.GET.get('page', 1))

        if search == '':
            return Response(data={'error': 'search param required'}, status=status.HTTP_400_BAD_REQUEST)

        cached = 'crew_search' in request.session and \
            sys.getsizeof(request.session['crew_search']) > 0 and \
            request.session['crew_search']['search'] == search and \
            request.session['crew_search']['page'] == page

        if not cached:
            query = f"https://api.themoviedb.org/3/search/person?api_key={api_key}&query={search}&page={page}"
            response = requests.get(query)
            crew = response.json()
            crew['results'] = [actor for actor in crew['results'] if actor['known_for_department'] != "Acting"]

            for member in crew['results']:
                if member['profile_path']:
                    member['profile_link_sm'] = f"https://image.tmdb.org/t/p/w154{member['profile_path']}"
                    member['profile_link_md'] = f"https://image.tmdb.org/t/p/w500{member['profile_path']}"
                    member['profile_link_og'] = f"https://image.tmdb.org/t/p/original{member['profile_path']}"
                member['type'] = 'crew'

            request.session['crew_search'] = crew
            request.session['crew_search']['search'] = search
            request.session['crew_search']['page'] = page

        return Response(request.session['crew_search'])


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


class PersonMetadataAPIView(APIView):

    def get(self, request, person_id):
        query = f"https://api.themoviedb.org/3/person/{person_id}?api_key={api_key}"

        response = requests.get(query)
        person = response.json()

        person['credits'] = self.sort_credits(person_id, person['known_for_department'])

        if person['profile_path']:
            person['profile_link_sm'] = f"https://image.tmdb.org/t/p/w154{person['profile_path']}"
            person['profile_link_md'] = f"https://image.tmdb.org/t/p/w500{person['profile_path']}"
            person['profile_link_og'] = f"https://image.tmdb.org/t/p/original{person['profile_path']}"

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


class MovieCreditsAPIView(APIView):

    def get(self, request, movie_id):
        query = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={api_key}"
        response = requests.get(query)
        movie_credits = response.json()

        movie_credits['directors'] = [dirs for dirs in movie_credits['crew'] if dirs['job'] == 'Director']

        return Response(movie_credits)
