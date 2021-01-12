from django.urls import path

from .views import ProfileAPIView, ProfileDetailAPIView, ProfileFriendshipsAPIView

profile_api = ProfileAPIView.as_view()
profile_detail_api = ProfileDetailAPIView.as_view()
profile_friendships_api = ProfileFriendshipsAPIView.as_view()

urlpatterns = [
    path("profiles/", profile_api, name="profiles"),
    path("profiles/<str:username>", profile_detail_api, name="profile_detail"),
    path("profiles/<str:username>/friendships", profile_friendships_api, name="profile_detail"),
]
