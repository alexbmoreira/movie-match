from django.contrib import admin

from .models import FriendRequest, FriendsList, Matchlist, Profile, Watchlist

admin.site.register(Profile)
admin.site.register(FriendsList)
admin.site.register(FriendRequest)
admin.site.register(Watchlist)
admin.site.register(Matchlist)
