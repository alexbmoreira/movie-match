from django.urls import path

from .views import MovieSearchAPIView

movie_search_api = MovieSearchAPIView.as_view()

urlpatterns = [
    path("movies/<str:search>/", movie_search_api, name="movies"),
    path("movies/<str:search>/<int:page>/", movie_search_api, name="movies_page"),
]