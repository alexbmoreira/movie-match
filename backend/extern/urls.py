from django.urls import path

from .views import (LetterboxdWatchlistAPIView)

letterboxd_watchlist_api = LetterboxdWatchlistAPIView.as_view()


urlpatterns = [
    path(
        "letterboxd/watchlist/<str:username>/",
        letterboxd_watchlist_api,
        name="letterboxd_watchlist"
    ),
]
