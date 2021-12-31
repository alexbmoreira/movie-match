from rest_framework.response import Response

from .tmdb_api_view import TmdbAPIView


class PersonMetadataAPIView(TmdbAPIView):

    def get(self, request, person_id):
        person = self.make_request(f"person/{person_id}")

        person['credits'] = self.sort_credits(person_id, person['known_for_department'])

        if person['profile_path']:
            person['profile_link_sm'] = self.get_image('w154', person['profile_path'])
            person['profile_link_md'] = self.get_image('w500', person['profile_path'])
            person['profile_link_og'] = self.get_image('original', person['profile_path'])

        return Response(person)

    def sort_credits(self, person_id, known_for):
        person_credits = self.make_request(f"person/{person_id}/movie_credits")

        credit_list = "cast" if known_for != "Acting" else "crew"
        person_credits['known_for_credits'] = sorted(
            person_credits[credit_list],
            key=lambda k: k['popularity'],
            reverse=True
        )[0:10]

        return person_credits

