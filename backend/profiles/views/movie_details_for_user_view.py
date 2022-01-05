from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import MovieDetailsForUserSerializer


class MovieDetailsForUserView(generics.RetrieveAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = MovieDetailsForUserSerializer

    def get_object(self):
        return self.request.user

    def get_serializer_context(self):
        return {
            **super().get_serializer_context(),
            'movie_id': self.kwargs['movie_id']
        }
