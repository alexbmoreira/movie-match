from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import MatchlistDislike, MatchlistLike, User
from ..serializers import MatchlistLikeSerializer, ProfileSerializer


class MatchlistLikeAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        likes = request.user.matchlist_likes.all()

        friend = request.GET.get('friend', '')

        if friend != "":
            likes = likes.filter(friend__id=friend)

        serializer = MatchlistLikeSerializer(likes, many=True)
        data = {}
        data['user'] = ProfileSerializer(request.user.profile).data
        data['likes'] = serializer.data
        return Response(data=data)

    def post(self, request):
        serializer = MatchlistLikeSerializer(data=request.data, context={'user_id': request.user.id})

        if serializer.is_valid():
            if self.check_conflict(request):
                return Response(status=status.HTTP_409_CONFLICT)
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        matchlist_like = get_object_or_404(MatchlistLike, id=request.data['id'])
        matchlist_like.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def check_conflict(self, request):
        friend = User.objects.get(id=request.data['friend'])
        try:
            return MatchlistDislike.objects.get(user=request.user, friend=friend, movie=request.data['movie'])
        except Exception:
            return None
