from django.shortcuts import get_object_or_404
from rest_framework import generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Friendship, MatchlistDislike, MatchlistLike, User
from ..serializers import (FriendshipSerializer, MatchlistLikeSerializer,
                           UserSerializer)


class MatchlistLikeView(viewsets.ModelViewSet):
    serializer_class = MatchlistLikeSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'movie_id'

    def get_queryset(self):
        return MatchlistLike.objects.filter(user=self.request.user, friend=self.kwargs['user_id'])

    def get_object(self):
        friend = User.objects.get(id=self.kwargs['user_id'])
        print(self.lookup_url_kwarg)
        return get_object_or_404(MatchlistLike, user=self.request.user, friend=friend, movie=self.kwargs['movie_id'])

    def get_serializer_context(self):
        return {
            **super().get_serializer_context(),
            'user_id': self.kwargs['user_id']
        }
