from django.urls import path

from .views import (LetterboxdWatchlistAPIView)

lbxd_wlist_api = LetterboxdWatchlistAPIView.as_view()


urlpatterns = [
    path("letterboxd/watchlist/<str:username>/", lbxd_wlist_api, name="letterboxd_watchlist")
]
