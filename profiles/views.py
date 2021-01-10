from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile
from .serializers import ProfileSerializer


class ProfileAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        profiles = Profile.objects.all()
        item = self.request.query_params.get("item", "")

        if item != "":
            profiles = profiles.filter(name=item)

        serializer = ProfileSerializer(profiles, many=True)

        return Response(serializer.data)
