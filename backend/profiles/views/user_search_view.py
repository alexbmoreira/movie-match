from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from ..models import User
from ..serializers import SimpleUserSerializer


class UserSearchView(generics.ListAPIView):
    serializer_class = SimpleUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        search = self.request.GET.get('search', '')
        return User.objects.search(search)
