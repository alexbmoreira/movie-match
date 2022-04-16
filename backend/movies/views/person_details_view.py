from rest_framework.response import Response
from rest_framework.views import APIView

from .tmdb_api_view import TmdbAPIView, TmdbRetrieveAPIView


class PersonMetadataAPIView(APIView):

    def get(self, request, person_id):
        cached = TmdbAPIView.is_cached(request, 'person_details', person_id=person_id)

        if not cached:
            person = TmdbRetrieveAPIView.make_request(f'person/{person_id}')

            person['credits'] = self.sort_credits(person_id, person['known_for_department'])

            if person['profile_path']:
                person['profile_link_sm'] = TmdbAPIView.get_image('w154', person['profile_path'])
                person['profile_link_md'] = TmdbAPIView.get_image('w500', person['profile_path'])
                person['profile_link_og'] = TmdbAPIView.get_image('original', person['profile_path'])

            TmdbAPIView.set_cache(request, 'person_details', person, person_id=person_id)

        return Response(request.session['person_details'])

    def sort_credits(self, person_id, known_for):
        person_credits = TmdbRetrieveAPIView.make_request(f'person/{person_id}/movie_credits')

        credit_list = 'cast' if known_for != 'Acting' else 'crew'
        person_credits['known_for_credits'] = sorted(
            person_credits[credit_list],
            key=lambda k: k['popularity'],
            reverse=True
        )[0:10]

        return person_credits

