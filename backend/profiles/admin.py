from django.contrib import admin

from .models import (FriendRequest, Friendship, MatchlistDislike,
                     MatchlistLike, User, WatchlistMovie)

admin.site.register(User)
admin.site.register(Friendship)
admin.site.register(FriendRequest)
admin.site.register(WatchlistMovie)
admin.site.register(MatchlistLike)
admin.site.register(MatchlistDislike)
