from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Profile, User
from ..serializers import ProfileSerializer, WatchlistMovieSerializer


class JointWatchlistAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        friend = get_object_or_404(User, id=request.GET.get('friend', ''))
        joint_watchlist = Profile.objects.get_joint_watchlist(request.user, friend)
        serializer = WatchlistMovieSerializer(joint_watchlist, many=True)
        data = {}
        data['user'] = ProfileSerializer(request.user.profile).data
        data['joint_watchlist'] = serializer.data
        return Response(data=data)
