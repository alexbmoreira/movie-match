from .friend_request_view import FriendRequestAPIView
from .friendship_view import FriendshipAPIView
from .joint_watchlist_view import JointWatchlistAPIView
from .matchlist_dislike_view import MatchlistDislikeAPIView
from .matchlist_like_view import MatchlistLikeAPIView
from .matchlist_match_view import MatchlistMatchAPIView
from .movie_details_for_user_view import MovieDetailsForUserView
from .profile_detail_view import ProfileDetailAPIView
from .profile_view import ProfileAPIView
from .user_view import UserAPIView
from .watchlist_view import WatchlistAPIView

__all__ = [
    'FriendRequestAPIView',
    'FriendshipAPIView',
    'JointWatchlistAPIView',
    'MatchlistDislikeAPIView',
    'MatchlistLikeAPIView',
    'MatchlistMatchAPIView',
    'MovieDetailsForUserView',
    'ProfileDetailAPIView',
    'ProfileAPIView',
    'UserAPIView',
    'WatchlistAPIView',
]
