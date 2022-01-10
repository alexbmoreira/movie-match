from django.shortcuts import get_object_or_404
from rest_framework import generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import MatchlistDislike, User
from ..serializers import MatchlistDislikeSerializer


class MatchlistDislikeView(viewsets.ModelViewSet):
    serializer_class = MatchlistDislikeSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'movie_id'

    def get_queryset(self):
        return MatchlistDislike.objects.filter(user=self.request.user, friend=self.kwargs['user_id'])

    def get_object(self):
        friend = User.objects.get(id=self.kwargs['user_id'])
        print(self.lookup_url_kwarg)
        return get_object_or_404(MatchlistDislike, user=self.request.user, friend=friend, movie=self.kwargs['movie_id'])

    def get_serializer_context(self):
        return {
            **super().get_serializer_context(),
            'user_id': self.kwargs['user_id']
        }
