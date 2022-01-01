from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import MatchlistDislike, MatchlistLike, User
from ..serializers import MatchlistDislikeSerializer, UserSerializer


class MatchlistDislikeAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        dislikes = request.user.matchlist_dislikes.all()

        friend = request.GET.get('friend', '')

        if friend != "":
            dislikes = dislikes.filter(friend__id=friend)

        serializer = MatchlistDislikeSerializer(dislikes, many=True)
        data = {}
        data['user'] = UserSerializer(request.user).data
        data['dislikes'] = serializer.data
        return Response(data=data)

    def post(self, request):
        serializer = MatchlistDislikeSerializer(data=request.data, context={'user_id': request.user.id})

        if serializer.is_valid():
            if self.check_conflict(request):
                return Response(status=status.HTTP_409_CONFLICT)
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        matchlist_dislike = get_object_or_404(MatchlistDislike, id=request.data['id'])
        matchlist_dislike.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def check_conflict(self, request):
        friend = User.objects.get(id=request.data['friend'])
        try:
            return MatchlistLike.objects.get(user=request.user, friend=friend, movie=request.data['movie'])
        except Exception:
            return None

