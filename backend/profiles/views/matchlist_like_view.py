from django.shortcuts import get_object_or_404
from rest_framework import viewsets

from ..models import MatchlistLike, User
from ..permissions import IsFriend
from ..serializers import MatchlistLikeSerializer


class MatchlistLikeView(viewsets.ModelViewSet):
    serializer_class = MatchlistLikeSerializer
    permission_classes = [IsFriend]
    lookup_url_kwarg = 'movie_id'

    def get_queryset(self):
        return MatchlistLike.objects.filter(
            user=self.request.user,
            friend=self.kwargs['user_id']
        )

    def get_object(self):
        friend = User.objects.get(id=self.kwargs['user_id'])
        print(self.lookup_url_kwarg)
        return get_object_or_404(MatchlistLike, user=self.request.user, friend=friend, movie=self.kwargs['movie_id'])

    def get_serializer_context(self):
        return {
            **super().get_serializer_context(),
            'user_id': self.kwargs['user_id']
        }
