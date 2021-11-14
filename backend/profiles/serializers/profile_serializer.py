from rest_framework import serializers

from ..models import Profile


class ProfileSerializer(serializers.ModelSerializer):

    user_id = serializers.ReadOnlyField(source='user.id')
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Profile
        fields = ['user_id', 'username']
