from django.db.models import Q
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import FriendRequest, Profile, User
from .serializers import (FriendRequestSerializer, ProfileSerializer,
                          UserSerializer)


class UserAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user

        serializer = UserSerializer(user)

        return Response(serializer.data)


class ProfileAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, search=""):
        profiles = Profile.objects.all()

        if search != "":
            profiles = profiles.filter(user__username=search)

        serializer = ProfileSerializer(profiles, many=True)

        return Response(serializer.data)


class ProfileDetailAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id):
        profile = get_object_or_404(Profile, user__id=user_id)
        serializer = ProfileSerializer(profile)

        return Response(data=serializer.data)
