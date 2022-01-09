from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Friendship, MatchlistDislike, MatchlistLike, User
from ..serializers import (FriendshipSerializer, MatchlistMovieSerializer,
                           UserSerializer)


class MatchlistView(generics.ListAPIView):
    serializer_class = MatchlistMovieSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        friend = get_object_or_404(User, id=self.kwargs['user_id'])
        return User.objects.get_matchlist(self.request.user, friend)
