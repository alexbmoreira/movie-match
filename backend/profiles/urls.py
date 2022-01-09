from django.urls import re_path
from rest_framework.routers import DefaultRouter

from .views import (CurrentUserView, FriendRequestView, FriendshipView,
                    MatchlistView, MovieDetailsForUserView, UserView,
                    WatchlistView)

router = DefaultRouter()

current_user_view = CurrentUserView.as_view()
movie_details_for_user_view = MovieDetailsForUserView.as_view()
matchlist_view = MatchlistView.as_view()

# urlpatterns = [
#     path('user/requests/', friend_requests_api, name='friend_requests'),
#     path('user/likes/', likes_api, name='likes'),
#     path('user/dislikes/', dislikes_api, name='dislikes'),
#     path('user/matches/', matches_api, name='matches'),
#     path('user/watchlist/', watchlist_api, name='watchlist'),
#     path('user/joint-watchlist/', joint_watchlist_api, name='joint_watchlist'),
# ]

router.register(r'users', UserView, basename='user')
router.register(r'user/watchlist', WatchlistView, basename='user-watchlist')
router.register(r'friendships', FriendshipView, basename='friendship')
router.register(r'friend-requests', FriendRequestView, basename='friend-request')

urlpatterns = [
    re_path(r'user/', current_user_view, name='current-user'),
    re_path(r'user/movie-details/(?P<movie_id>\w+)/', movie_details_for_user_view, name='movie-details'),
    re_path(r'matchlists/(?P<user_id>\w+)/', matchlist_view, name='matchlist')
] + router.urls
