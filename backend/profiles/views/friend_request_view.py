from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import FriendRequest, Friendship, User
from ..serializers import FriendRequestSerializer, FriendshipSerializer


class FriendRequestView(viewsets.ModelViewSet):
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]
    queryset = FriendRequest.objects.all()

    def get_queryset(self):
        return FriendRequest.objects.get_friend_requests(self.request.user)

    @action(detail=False, url_path=r'with-user/(?P<user_id>\w+)')
    def with_user(self, request, user_id):
        other_user = get_object_or_404(User, id=user_id)
        friendship = FriendRequest.objects.get_friend_request(user1=self.request.user, user2=other_user)
        serializer = FriendRequestSerializer(friendship)
        print(serializer.data)
        return Response(serializer.data)

    @action(methods=['post'], detail=True)
    def accept(self, request, pk=None):
        friend_request = self.get_object()
        friendship = Friendship.objects.create(user=friend_request.receiver, friend=friend_request.creator)
        self.perform_destroy(friend_request)
        serializer = FriendshipSerializer(friendship)
        return Response(serializer.data)
