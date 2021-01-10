from django.urls import path

from .views import ProfileAPIView, ProfileDetailAPIView

profile_api = ProfileAPIView.as_view()
profile_detail_api = ProfileDetailAPIView.as_view()

urlpatterns = [
    path("profiles/", profile_api, name="profiles"),
    path("profiles/<int:user_id>", profile_detail_api, name="profile_detail"),
]
