from django.urls import path

from .views import (FriendRequestAPIView, FriendshipAPIView,
                    MatchlistDislikeAPIView, MatchlistLikeAPIView,
                    ProfileAPIView, ProfileDetailAPIView, UserAPIView,
                    WatchlistAPIView)

user_api = UserAPIView.as_view()
profile_api = ProfileAPIView.as_view()
profile_detail_api = ProfileDetailAPIView.as_view()
friend_requests_api = FriendRequestAPIView.as_view()
friendships_api = FriendshipAPIView.as_view()
watchlist_api = WatchlistAPIView.as_view()
likes_api = MatchlistLikeAPIView.as_view()
dislikes_api = MatchlistDislikeAPIView.as_view()

urlpatterns = [
    path("user/requests/", friend_requests_api, name="friend_requests"),
    path("user/friends/", friendships_api, name="friendships"),
    path("user/watchlist/", watchlist_api, name="watchlist"),
    path("user/likes/", likes_api, name="likes"),
    path("user/dislikes/", dislikes_api, name="dislikes"),
    path("user/", user_api, name="current_user"),
    path("profiles/<int:user_id>/", profile_detail_api, name="profile_detail"),
    path("profiles/", profile_api, name="profiles"),
]
