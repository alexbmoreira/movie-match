from django.db.models import Q
from django.http import request
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import Friendship, User
from ..serializers import FriendshipSerializer


class FriendshipView(viewsets.ModelViewSet):
    serializer_class = FriendshipSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        other_user = get_object_or_404(User, id=self.kwargs[self.lookup_field])
        return Friendship.objects.get_friendship(user1=self.request.user, user2=other_user)

    def get_queryset(self):
        return Friendship.objects.get_friendships(self.request.user)
