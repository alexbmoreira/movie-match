from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import User
from ..serializers import MatchlistLikeSerializer, ProfileSerializer


class MatchlistMatchAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        friend = get_object_or_404(User, id=request.GET.get('friend', ''))
        user_likes = request.user.matchlist_likes.all()
        friend_likes = [ml.movie for ml in friend.matchlist_likes.all()]
        matches = [ml for ml in user_likes if ml.movie in friend_likes]
        serializer = MatchlistLikeSerializer(matches, many=True)
        data = {}
        data['user'] = ProfileSerializer(request.user.profile).data
        data['matches'] = serializer.data
        return Response(data=data)
