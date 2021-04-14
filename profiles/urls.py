from django.urls import path

from .views import ProfileAPIView, ProfileDetailAPIView, UserAPIView

user_api = UserAPIView.as_view()
profile_api = ProfileAPIView.as_view()
profile_detail_api = ProfileDetailAPIView.as_view()

urlpatterns = [
    path("user/", user_api, name="current_user"),
    path("profiles/search/", profile_api, name="profiles"),
    path("profiles/search/<str:search>", profile_api, name="profiles_search"),
    path("profiles/<int:user_id>/", profile_detail_api, name="profile_detail_api"),
]
