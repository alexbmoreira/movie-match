from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import FriendRequest, User
from ..serializers import FriendRequestSerializer


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
