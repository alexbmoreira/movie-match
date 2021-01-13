from django.shortcuts import get_object_or_404, render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile, FriendsList
from .serializers import ProfileSerializer, FriendsListSerializer


class ProfileAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        profiles = Profile.objects.all()
        item = self.request.query_params.get("item", "")

        if item != "":
            profiles = profiles.filter(name=item)

        serializer = ProfileSerializer(profiles, many=True)

        return Response(serializer.data)


class ProfileDetailAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id):
        profile = get_object_or_404(Profile, id=user_id)
        serializer = ProfileSerializer(profile)

        return Response(data=serializer.data)


class ProfileFriendsAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id):
        # friends_list = FriendsList.objects.all()
        friends_list = get_object_or_404(FriendsList, user__id=user_id)
        serializer = FriendsListSerializer(friends_list)

        return Response(data=serializer.data)


# class ProfileFriendshipsAPIView(APIView):

#     permission_classes = (IsAuthenticated,)

#     def get(self, request, username):
#         profile = get_object_or_404(Profile, user__username=username)
#         serializer = ProfileFriendshipSerializer(profile)

#         return Response(data=serializer.data)

#     def post(self, request):
#         serializer = ProfileFriendshipSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_201_CREATED)

#         return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
