from .friend_request_view import FriendRequestAPIView
from .friendship_view import FriendshipAPIView
from .joint_watchlist_view import JointWatchlistAPIView
from .matchlist_dislike_view import MatchlistDislikeAPIView
from .matchlist_like_view import MatchlistLikeAPIView
from .matchlist_match_view import MatchlistMatchAPIView
from .movie_details_for_user_view import MovieDetailsForUserView
from .user_detail_view import UserDetailAPIView
from .user_search_view import UserSearchView
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
    'UserDetailAPIView',
    'UserSearchView',
    'UserAPIView',
    'WatchlistAPIView',
]
