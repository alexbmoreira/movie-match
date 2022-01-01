from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import User
from ..serializers import UserSerializer, WatchlistMovieSerializer


class JointWatchlistAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        friend = get_object_or_404(User, id=request.GET.get('friend', ''))
        joint_watchlist = User.objects.get_joint_watchlist(request.user, friend)
        serializer = WatchlistMovieSerializer(joint_watchlist, many=True)
        data = {}
        data['user'] = UserSerializer(request.user).data
        data['joint_watchlist'] = serializer.data
        return Response(data=data)
