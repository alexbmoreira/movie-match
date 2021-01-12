from django.urls import path

from .views import MovieSearchAPIView, ActorSearchAPIView, CrewSearchAPIView

movie_search_api = MovieSearchAPIView.as_view()
actor_search_api = ActorSearchAPIView.as_view()
crew_search_api = CrewSearchAPIView.as_view()

urlpatterns = [
    path("movies/<str:search>/", movie_search_api, name="movies"),
    path("movies/<str:search>/<int:page>/", movie_search_api, name="movies_page"),
    path("actors/<str:search>/", actor_search_api, name="actors"),
    path("actors/<str:search>/<int:page>/", actor_search_api, name="actors_page"),
    path("crew/<str:search>/", crew_search_api, name="crew"),
    path("crew/<str:search>/<int:page>/", crew_search_api, name="crew_page"),
]
