from django.urls import path

from .views import (FriendRequestAPIView, FriendshipAPIView, ProfileAPIView,
                    ProfileDetailAPIView, UserAPIView)

user_api = UserAPIView.as_view()
profile_api = ProfileAPIView.as_view()
profile_detail_api = ProfileDetailAPIView.as_view()
friend_requests_api = FriendRequestAPIView.as_view()
friendships_api = FriendshipAPIView.as_view()

urlpatterns = [
    path("user/", user_api, name="current_user"),
    path("user/requests/", friend_requests_api, name="friend_requests"),
    path("user/requests/<str:type>/", friend_requests_api, name="friend_requests"),
    path("user/friends/", friendships_api, name="friendships"),
    path("profiles/", profile_api, name="profiles"),
    path("profiles/search/<str:search>/", profile_api, name="profiles_search"),
    path("profiles/<int:user_id>/", profile_detail_api, name="profile_detail"),
]
