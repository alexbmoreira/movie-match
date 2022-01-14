from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from ..models import Friendship, User
from ..serializers import UserSerializer


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        search = self.request.GET.get('search', '')
        return User.objects.search(search)

    @action(detail=True)
    def friends(self, request, pk=None):
        user = self.get_object()
        friends = Friendship.objects.get_friends(user)

        page = self.paginate_queryset(friends)
        if page is not None:
            serializer = UserSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
