from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .tmdb_api_view import TmdbAPIView, TmdbListAPIView


class CrewSearchAPIView(APIView):

    def get(self, request):
        search = request.GET.get('search', '')
        page = int(request.GET.get('page', 1))

        if search == '':
            return Response(data={'error': 'search param required'}, status=status.HTTP_400_BAD_REQUEST)

        cached = TmdbListAPIView.is_cached(request, 'crew_search', search=search, page=page)

        if not cached:
            crew = TmdbAPIView.make_request('search/person', query=search, page=page)
            crew['results'] = [actor for actor in crew['results'] if actor['known_for_department'] != "Acting"]

            for member in crew['results']:
                if member['profile_path']:
                    member['profile_link_sm'] = TmdbAPIView.get_image('w154', member['profile_path'])
                    member['profile_link_md'] = TmdbAPIView.get_image('w500', member['profile_path'])
                    member['profile_link_og'] = TmdbAPIView.get_image('original', member['profile_path'])
                member['type'] = 'crew'

            TmdbAPIView.set_cache(request, 'crew_search', crew, search=search, page=page)

        return Response(request.session['crew_search'])
