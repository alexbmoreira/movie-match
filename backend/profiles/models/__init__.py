from django.contrib.auth.models import User

from .friend_request import FriendRequest
from .friendship import Friendship
from .matchlist_dislike import MatchlistDislike
from .matchlist_like import MatchlistLike
from .profile import Profile
from .watchlist_movie import WatchlistMovie

__all__ = [
    'Profile',
    'Friendship',
    'FriendRequest',
    'MatchlistLike',
    'MatchlistDislike',
    'WatchlistMovie',
    'User'
]
