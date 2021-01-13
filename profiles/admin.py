from django.contrib import admin
from .models import Profile, FriendsList, FriendRequest

admin.site.register(Profile)
admin.site.register(FriendsList)
admin.site.register(FriendRequest)
