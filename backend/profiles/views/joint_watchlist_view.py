from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from ..models import User
from ..permissions import IsFriend
from ..serializers import WatchlistMovieSerializer


class JointWatchlistView(generics.ListAPIView):
    serializer_class = WatchlistMovieSerializer
    permission_classes = [IsFriend]

    def get_queryset(self):
        friend = get_object_or_404(User, id=self.kwargs['user_id'])
        return User.objects.get_joint_watchlist(self.request.user, friend)
