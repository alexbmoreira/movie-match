from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (CurrentUserView, MovieDetailsForUserView, UserView,
                    WatchlistView)

router = DefaultRouter()

current_user_view = CurrentUserView.as_view()
movie_details_for_user_view = MovieDetailsForUserView.as_view()

# urlpatterns = [
#     path("user/requests/", friend_requests_api, name="friend_requests"),
#     path("user/likes/", likes_api, name="likes"),
#     path("user/dislikes/", dislikes_api, name="dislikes"),
#     path("user/matches/", matches_api, name="matches"),
#     path("user/watchlist/", watchlist_api, name="watchlist"),
#     path("user/joint-watchlist/", joint_watchlist_api, name="joint_watchlist"),
#     path("users/<int:user_id>/friends/", friendships_api, name="friendships_all"),
# ]

router.register(r'users', UserView, basename='user')
router.register(r'user/watchlist', WatchlistView, basename='user-watchlist')

urlpatterns = [
    path("user/", current_user_view, name="current_user"),
    path("user/movie-details/<int:movie_id>/", movie_details_for_user_view, name="movie_details"),
] + router.urls
