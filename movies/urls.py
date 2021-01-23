from django.urls import path

from .views import (ActorSearchAPIView, CrewSearchAPIView,
                    MovieMetadataAPIView, MovieSearchAPIView,
                    PersonMetadataAPIView, PopularMoviesAPIView)

movie_search_api = MovieSearchAPIView.as_view()
actor_search_api = ActorSearchAPIView.as_view()
crew_search_api = CrewSearchAPIView.as_view()
movie_data_api = MovieMetadataAPIView.as_view()
person_data_api = PersonMetadataAPIView.as_view()
popular_movies_api = PopularMoviesAPIView.as_view()


urlpatterns = [
    path("movies/<str:search>/", movie_search_api, name="movies"),
    path("movies/<str:search>/<int:page>/", movie_search_api, name="movies_page"),
    path("actors/<str:search>/", actor_search_api, name="actors"),
    path("actors/<str:search>/<int:page>/", actor_search_api, name="actors_page"),
    path("crew/<str:search>/", crew_search_api, name="crew"),
    path("crew/<str:search>/<int:page>/", crew_search_api, name="crew_page"),
    path("movie/<int:movie_id>/", movie_data_api, name="movie_metadata"),
    path("person/<int:person_id>/", person_data_api, name="person_metadata"),
    path("popular/", popular_movies_api, name="popular_movies"),
    path("popular/<int:page>/", popular_movies_api, name="popular_movies_page"),
]
