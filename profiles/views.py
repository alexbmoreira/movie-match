from django.shortcuts import get_object_or_404, render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile
from .serializers import ProfileSerializer, ProfileDetailSerializer


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

    def get(self, request, username):
        profile = get_object_or_404(Profile, user__username=username)
        serializer = ProfileDetailSerializer(profile)

        return Response(data=serializer.data)
