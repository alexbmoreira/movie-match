from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import MovieDetailsForUserSerializer


class MovieDetailsForUserView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, movie_id):
        data = MovieDetailsForUserSerializer(request.user, context={'movie_id': movie_id}).data
        return Response(data=data)
