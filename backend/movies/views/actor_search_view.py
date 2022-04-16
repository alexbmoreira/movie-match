from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .tmdb_api_view import TmdbAPIView, TmdbListAPIView


class ActorSearchAPIView(APIView):

    def get(self, request):
        search = request.GET.get('search', '')
        page = int(request.GET.get('page', 1))

        if search == '':
            return Response(data={'error': 'search param required'}, status=status.HTTP_400_BAD_REQUEST)

        cached = TmdbAPIView.is_cached(request, 'actor_search', search=search, page=page)

        if not cached:
            actors = TmdbListAPIView.make_request('search/person', query=search, page=page)
            actors['results'] = [actor for actor in actors['results'] if actor['known_for_department'] == "Acting"]

            for actor in actors['results']:
                if actor['profile_path']:
                    actor['profile_link_sm'] = TmdbAPIView.get_image('w154', actor['profile_path'])
                    actor['profile_link_md'] = TmdbAPIView.get_image('w500', actor['profile_path'])
                    actor['profile_link_og'] = TmdbAPIView.get_image('original', actor['profile_path'])
                actor['type'] = 'actor'

            TmdbAPIView.set_cache(request, 'actor_search', actors, search=search, page=page)

        return Response(request.session['actor_search'])
