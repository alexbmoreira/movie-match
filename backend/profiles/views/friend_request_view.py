from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import FriendRequest
from ..serializers import FriendRequestSerializer


class FriendRequestAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        kind = request.GET.get('kind', '')

        if kind == 'sent':
            friend_requests = FriendRequest.objects.filter(creator=request.user)
            serializer = FriendRequestSerializer(friend_requests, many=True)
            return Response(data=serializer.data)
        elif kind == 'received':
            friend_requests = FriendRequest.objects.filter(receiver=request.user)
            serializer = FriendRequestSerializer(friend_requests, many=True)
            return Response(data=serializer.data)

        return Response(data={'error': 'invalid friend request kind'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        request.data['creator'] = request.user.id
        request.data['active'] = True
        serializer = FriendRequestSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        friend_request = FriendRequest.objects.get(id=request.data['id'])
        if request.data['action'] == 'accept' and request.user == friend_request.receiver:
            friend_request.accept()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif request.data['action'] == 'cancel' and request.user == friend_request.creator:
            friend_request.cancel()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif request.data['action'] == 'decline' and request.user == friend_request.receiver:
            friend_request.decline()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)
