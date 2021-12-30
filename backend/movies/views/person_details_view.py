import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView

api_key = settings.TMDB_API


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

