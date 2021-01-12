from django.urls import path

from .views import ProfileAPIView, ProfileFriendsAPIView

profile_api = ProfileAPIView.as_view()
profile_friends_api = ProfileFriendsAPIView.as_view()

urlpatterns = [
    path("profiles/", profile_api, name="profiles"),
    path("profiles/<str:username>/friends", profile_friends_api, name="profile_friends_detail"),
    # path("profiles/<str:username>/friendships", profile_friendships_api, name="profile_detail"),
]
