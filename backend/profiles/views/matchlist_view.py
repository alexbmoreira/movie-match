from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from ..models import User
from ..permissions import IsFriend
from ..serializers import MatchlistMovieSerializer


class MatchlistView(generics.ListAPIView):
    serializer_class = MatchlistMovieSerializer
    permission_classes = [IsFriend]

    def get_queryset(self):
        friend = get_object_or_404(User, id=self.kwargs['user_id'])
        return User.objects.get_matchlist(self.request.user, friend)
