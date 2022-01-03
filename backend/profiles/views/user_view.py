from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import User
from ..serializers import SimpleUserSerializer, UserSerializer


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        search = self.request.GET.get('search', '')
        return User.objects.search(search)

    def get_serializer_class(self):
        if self.action == 'list':
            return SimpleUserSerializer

        return self.serializer_class               
