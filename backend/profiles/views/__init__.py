from .current_user_view import CurrentUserView
from .friend_request_view import FriendRequestAPIView
from .friendship_view import FriendshipAPIView
from .joint_watchlist_view import JointWatchlistAPIView
from .matchlist_dislike_view import MatchlistDislikeAPIView
from .matchlist_like_view import MatchlistLikeAPIView
from .matchlist_match_view import MatchlistMatchAPIView
from .movie_details_for_user_view import MovieDetailsForUserView
from .user_view import UserView
from .watchlist_view import WatchlistView

__all__ = [
    'FriendRequestAPIView',
    'FriendshipAPIView',
    'JointWatchlistAPIView',
    'MatchlistDislikeAPIView',
    'MatchlistLikeAPIView',
    'MatchlistMatchAPIView',
    'MovieDetailsForUserView',
    'UserView',
    'CurrentUserView',
    'WatchlistView',
]
