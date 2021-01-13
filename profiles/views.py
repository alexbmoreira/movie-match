import io

from django.db.models import Q
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import FriendRequest, FriendsList, Profile, User
from .serializers import (FriendRequestSerializer, FriendsListSerializer,
                          ProfileSerializer, UserSerializer)


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


class ProfileFriendsAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id):
        friends_list = get_object_or_404(FriendsList, user__id=user_id)
        serializer = FriendsListSerializer(friends_list)

        return Response(data=serializer.data)


class FriendRequestsAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        friend_reqs = FriendRequest.objects.filter(Q(creator=request.user) | Q(receiver=request.user), active=True)
        serializer = FriendRequestSerializer(friend_reqs, many=True)

        return Response(data=serializer.data)

    def post(self, request):
        try:
            send_to_user = User.objects.get(**request.data)
            FriendRequest.objects.create(creator=request.user, receiver=send_to_user)
            return Response(status=status.HTTP_201_CREATED)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class FriendActionAPIView(APIView):

    def get(self, request, operation, user_id):
        friend = User.objects.get(id=user_id)

        friends_list = FriendsList.objects.get(user=request.user)

        if operation == 'add':
            friends_list.friend(friend)
            return Response(status=status.HTTP_201_CREATED)
        elif operation == 'remove':
            friends_list.unfriend(friend)
            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(data={'outcome': 'error'}, status=status.HTTP_400_BAD_REQUEST)


class RequestActionAPIView(APIView):

    def get(self, request, operation, request_id):
        friend_request = FriendRequest.objects.get(id=request_id)

        if operation == 'accept' and friend_request.receiver == request.user:
            friend_request.accept()
            return Response(status=status.HTTP_201_CREATED)
        elif operation == 'decline' and friend_request.receiver == request.user:
            friend_request.decline()
            return Response(status=status.HTTP_202_ACCEPTED)
        elif operation == 'cancel' and friend_request.creator == request.user:
            friend_request.cancel()
            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(data={'outcome': 'error'}, status=status.HTTP_400_BAD_REQUEST)
