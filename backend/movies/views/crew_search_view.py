import sys

import requests
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

api_key = settings.TMDB_API


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
