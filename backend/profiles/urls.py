from django.urls import path

from .views import (FriendRequestAPIView, FriendshipAPIView,
                    JointWatchlistAPIView, MatchlistDislikeAPIView,
                    MatchlistLikeAPIView, MatchlistMatchAPIView,
                    MovieDetailsForUserView, UserAPIView, UserDetailAPIView,
                    UserSearchView, WatchlistAPIView)

user_api = UserAPIView.as_view()
user_search_api = UserSearchView.as_view()
user_detail_api = UserDetailAPIView.as_view()
friend_requests_api = FriendRequestAPIView.as_view()
friendships_api = FriendshipAPIView.as_view()
watchlist_api = WatchlistAPIView.as_view()
likes_api = MatchlistLikeAPIView.as_view()
dislikes_api = MatchlistDislikeAPIView.as_view()
matches_api = MatchlistMatchAPIView.as_view()
joint_watchlist_api = JointWatchlistAPIView.as_view()
movie_details_api = MovieDetailsForUserView.as_view()

urlpatterns = [
    path("user/requests/", friend_requests_api, name="friend_requests"),
    path("user/likes/", likes_api, name="likes"),
    path("user/dislikes/", dislikes_api, name="dislikes"),
    path("user/matches/", matches_api, name="matches"),
    path("user/watchlist/", watchlist_api, name="watchlist"),
    path("user/joint-watchlist/", joint_watchlist_api, name="joint_watchlist"),
    path("user/", user_api, name="current_user"),
    path("users/", user_search_api, name="users"),
    path("users/<int:user_id>/", user_detail_api, name="user_detail"),
    path("users/<int:user_id>/friends/", friendships_api, name="friendships_all"),
    path("user/movie-details/<int:movie_id>/", movie_details_api, name="movie_details"),
]
