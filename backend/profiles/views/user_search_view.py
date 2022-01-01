from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import User
from ..serializers import UserSerializer


class UserSearchAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, search=''):
        users = User.objects.search(search)

        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)
