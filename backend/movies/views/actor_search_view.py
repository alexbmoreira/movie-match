import sys

import requests
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

api_key = settings.TMDB_API


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
