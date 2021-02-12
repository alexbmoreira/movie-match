from django.db.models import Q
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (FriendRequest, FriendsList, Matchlist, Profile, User,
                     Watchlist)
from .serializers import (FriendRequestSerializer, FriendsListSerializer,
                          JointWatchListSerializer, MatchListSerializer,
                          ProfileSerializer, UserSerializer,
                          WatchListSerializer)


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

    def post(self, request, operation, user_id):
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

    def post(self, request, operation, request_id):
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


class ProfileWatchlistAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id):
        watchlist = get_object_or_404(Watchlist, user__id=user_id)
        serializer = WatchListSerializer(watchlist)

        return Response(data=serializer.data)


class WatchlistActionAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, operation):
        try:
            watchlist = get_object_or_404(Watchlist, user=request.user)
            if operation == 'add':
                watchlist.add_movie(request.data['id'])
                return Response(status=status.HTTP_201_CREATED)
            elif operation == 'remove':
                watchlist.remove_movie(request.data['id'])
                return Response(status=status.HTTP_202_ACCEPTED)

            return Response(data={'outcome': 'error'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class JointWatchlistAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id):
        query = Q(user__id=request.user.id, friend__id=user_id)
        joint_watchlist = get_object_or_404(Matchlist, query)
        serializer = JointWatchListSerializer(joint_watchlist)

        return Response(data=serializer.data)


class MatchlistAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id):
        query = Q(user__id=request.user.id, friend__id=user_id)
        matchlist = get_object_or_404(Matchlist, query)
        serializer = MatchListSerializer(matchlist)

        return Response(data=serializer.data)


class MatchlistActionAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, operation, user_id):
        query = Q(user__id=request.user.id, friend__id=user_id)
        matchlist = get_object_or_404(Matchlist, query)
        other_matchlist = get_object_or_404(Matchlist, user__id=user_id, friend__id=request.user.id)

        if operation == 'like':
            matchlist.like_movie(request.data['id'])
            if request.data['id'] in other_matchlist.likes:
                return Response(data={'match': request.data['id']}, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_201_CREATED)
        elif operation == 'unlike':
            matchlist.unlike_movie(request.data['id'])
            return Response(status=status.HTTP_202_ACCEPTED)
        elif operation == 'dislike':
            matchlist.dislike_movie(request.data['id'])
            return Response(status=status.HTTP_201_CREATED)
        elif operation == 'undislike':
            matchlist.undislike_movie(request.data['id'])
            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(data={'outcome': 'error'}, status=status.HTTP_400_BAD_REQUEST)
