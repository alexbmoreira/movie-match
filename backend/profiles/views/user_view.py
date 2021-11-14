from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import UserSerializer


class UserAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user

        serializer = UserSerializer(user)

        return Response(serializer.data)
