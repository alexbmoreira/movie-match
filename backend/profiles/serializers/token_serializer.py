from rest_auth.models import TokenModel
from rest_framework import serializers

from .user_serializer import UserSerializer


class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = TokenModel
        fields = ['key', 'user']
