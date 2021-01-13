from django.urls import path

from .views import ProfileAPIView, ProfileDetailAPIView, ProfileFriendsAPIView, FriendActionAPIView, FriendRequestsAPIView, RequestActionAPIView

profile_api = ProfileAPIView.as_view()
profile_detail_api = ProfileDetailAPIView.as_view()
profile_friends_api = ProfileFriendsAPIView.as_view()
friend_action_api = FriendActionAPIView.as_view()
user_requests_api = FriendRequestsAPIView.as_view()
request_action_api = RequestActionAPIView.as_view()

urlpatterns = [
    path("profiles/", profile_api, name="profiles"),
    path("profiles/<int:user_id>/", profile_detail_api, name="profile_detail_api"),
    path("profiles/<int:user_id>/friends/", profile_friends_api, name="profile_friends_detail"),
    path("profiles/<int:user_id>/friends/", profile_friends_api, name="profile_friends_detail"),
    path("user/friends/<str:operation>/<int:user_id>/", friend_action_api, name="update_friends"),
    path("user/requests/", user_requests_api, name="update_requests"),
    path("user/requests/<str:operation>/<int:request_id>/", request_action_api, name="update_requests"),
]
