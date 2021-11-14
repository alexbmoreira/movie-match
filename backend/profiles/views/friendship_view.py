from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Friendship, User
from ..serializers import FriendshipSerializer


class FriendshipAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id=-1):
        user = request.user if user_id < 0 else get_object_or_404(User, id=user_id)
        friends = Friendship.objects.filter(Q(user=user) | Q(friend=user))
        serializer = FriendshipSerializer(friends, many=True, context={'user_id': user.id})
        return Response(data=serializer.data)

    def delete(self, request):
        friendship = get_object_or_404(Friendship, id=request.data['id'])
        if friendship.user != request.user and friendship.friend != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        friendship.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
