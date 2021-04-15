from django.db.models import Q
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import FriendRequest, Friendship, Profile, User
from .serializers import (FriendRequestSerializer, FriendshipSerializer,
                          ProfileSerializer, UserSerializer)


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
            profiles = profiles.filter(user__username__icontains=search)

        serializer = ProfileSerializer(profiles, many=True)

        return Response(serializer.data)


class ProfileDetailAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id):
        profile = get_object_or_404(Profile, user__id=user_id)
        serializer = ProfileSerializer(profile)

        return Response(data=serializer.data)


class FriendRequestAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, type=''):
        if type == 'sent':
            friend_requests = FriendRequest.objects.filter(creator=request.user)
            serializer = FriendRequestSerializer(friend_requests, many=True)
            return Response(data=serializer.data)
        elif type == 'received':
            friend_requests = FriendRequest.objects.filter(receiver=request.user)
            serializer = FriendRequestSerializer(friend_requests, many=True)
            return Response(data=serializer.data)
        
        return Response(status=status.HTTP_404_NOT_FOUND)

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

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FriendshipAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        friends = Friendship.objects.filter(Q(user=request.user) | Q(friend=request.user))
        serializer = FriendshipSerializer(friends, many=True, context={'user_id': request.user.id})
        return Response(data=serializer.data)

    # def delete(self, request):
    #     friend_request = FriendRequest.objects.get(id=request.data['id'])
    #     if request.data['action'] == 'accept' and request.user == friend_request.receiver:
    #         friend_request.accept()
    #         return Response(status=status.HTTP_204_NO_CONTENT)
    #     elif request.data['action'] == 'cancel' and request.user == friend_request.creator:
    #         friend_request.cancel()
    #         return Response(status=status.HTTP_204_NO_CONTENT)
    #     elif request.data['action'] == 'decline' and request.user == friend_request.receiver:
    #         friend_request.decline()
    #         return Response(status=status.HTTP_204_NO_CONTENT)

    #     return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
