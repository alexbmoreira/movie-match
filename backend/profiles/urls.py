from django.urls import re_path
from rest_framework.routers import DefaultRouter

from .views import (CurrentUserView, FriendRequestView, FriendshipView,
                    JointWatchlistView, MatchlistDislikeView,
                    MatchlistLikeView, MatchlistView, MovieDetailsForUserView,
                    UserView, WatchlistView)

router = DefaultRouter()

current_user_view = CurrentUserView.as_view()
movie_details_for_user_view = MovieDetailsForUserView.as_view()
matchlist_view = MatchlistView.as_view()
joint_watchlist_view = JointWatchlistView.as_view()

router.register(r'users', UserView, basename='user')
router.register(r'users/(?P<user_id>\w+)/watchlist', WatchlistView, basename='user-watchlist')
router.register(r'friendships', FriendshipView, basename='friendship')
router.register(r'friend-requests', FriendRequestView, basename='friend-request')
router.register(r'matchlists/(?P<user_id>\w+)/likes', MatchlistLikeView, basename='matchlist-likes')
router.register(r'matchlists/(?P<user_id>\w+)/dislikes', MatchlistDislikeView, basename='matchlist-dislikes')

urlpatterns = router.urls + [
    re_path(r'user/movie-details/(?P<movie_id>\w+)/', movie_details_for_user_view, name='movie-details'),
    re_path(r'user/', current_user_view, name='current-user'),
    re_path(r'matchlists/(?P<user_id>\w+)/', matchlist_view, name='matchlist'),
    re_path(r'joint-watchlists/(?P<user_id>\w+)/', joint_watchlist_view, name='joint-watchlist')
]
