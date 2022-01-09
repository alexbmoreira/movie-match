from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import FriendRequest, User
from ..serializers import FriendRequestSerializer


class FriendRequestView(viewsets.ModelViewSet):
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]
    queryset = FriendRequest.objects.all()

    def get_object(self):
        other_user = get_object_or_404(User, id=self.kwargs[self.lookup_field])
        return FriendRequest.objects.get_friend_request(user1=self.request.user, user2=other_user)

    def get_queryset(self):
        return FriendRequest.objects.get_friend_requests(self.request.user)
