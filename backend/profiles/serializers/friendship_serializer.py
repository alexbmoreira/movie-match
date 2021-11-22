from rest_framework import serializers

from ..models import Friendship
from .profile_serializer import ProfileSerializer


class FriendshipSerializer(serializers.ModelSerializer):

    friend = serializers.SerializerMethodField()

    class Meta:
        model = Friendship
        fields = ['id', 'friend']

    def get_friend(self, obj):
        user_id = self.context["user_id"]
        user = obj.friend if obj.friend.id != user_id else obj.user
        return ProfileSerializer(user.profile).data