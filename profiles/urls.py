from django.urls import path

from .views import ProfileAPIView

profile_api = ProfileAPIView.as_view()

urlpatterns = [
    path("profiles", profile_api, name="profiles"),
]
