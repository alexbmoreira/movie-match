from django.urls import path

from .views import (FriendAPIView, FriendRequestsAPIView, ProfileAPIView,
                    ProfileDetailAPIView, ProfileFriendRequestsAPIView,
                    ProfileFriendsAPIView)

profile_api = ProfileAPIView.as_view()
profile_friends_api = ProfileFriendsAPIView.as_view()
profile_detail_api = ProfileDetailAPIView.as_view()
friend_api = FriendAPIView.as_view()
friend_requests = FriendRequestsAPIView.as_view()

urlpatterns = [
    path("profiles/", profile_api, name="profiles"),
    path("profiles/<int:user_id>/", profile_detail_api, name="profile_detail_api"),
    path("profiles/<int:user_id>/friends/", profile_friends_api, name="profile_friends_detail"),
    path("profiles/<int:user_id>/friends/<int:friend_id>/", friend_api, name="friend"),
    path("profiles/<int:user_id>/requests/", friend_requests, name="friend_requests"),
]
