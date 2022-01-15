from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Friendship
from ..serializers import FriendshipSerializer


class FriendshipView(viewsets.ModelViewSet):
    serializer_class = FriendshipSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Friendship.objects.get_friendships(self.request.user)

    @action(detail=False, url_path=r'with-user/(?P<user_id>\w+)')
    def with_user(self, request, user_id):
        friendship = Friendship.objects.get_friendship(self.request.user.id, user_id)
        serializer = FriendshipSerializer(friendship)
        return Response(serializer.data)
