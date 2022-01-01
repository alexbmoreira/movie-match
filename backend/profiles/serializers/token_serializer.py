from rest_auth.models import TokenModel
from rest_framework import serializers

from .simple_user_serializer import SimpleUserSerializer


class TokenSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(many=False, read_only=True)

    class Meta:
        model = TokenModel
        fields = ('key', 'user')
