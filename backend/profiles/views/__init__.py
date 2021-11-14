from .friend_request_view import FriendRequestAPIView
from .friendship_view import FriendshipAPIView
from .matchlist_dislike_view import MatchlistDislikeAPIView
from .matchlist_like_view import MatchlistLikeAPIView
from .matchlist_match_view import MatchlistMatchAPIView
from .profile_view import ProfileAPIView
from .profile_detail_view import ProfileDetailAPIView
from .user_view import UserAPIView
from .watchlist_view import WatchlistAPIView
from .joint_watchlist_view import JointWatchlistAPIView

__all__ = [
    'ProfileAPIView',
    'ProfileDetailAPIView',
    'FriendshipAPIView',
    'FriendRequestAPIView',
    'MatchlistLikeAPIView',
    'MatchlistDislikeAPIView',
    'MatchlistMatchAPIView',
    'WatchlistAPIView',
    'JointWatchlistAPIView',
    'UserAPIView'
]
