from django.contrib.auth.models import User
from django.test import TestCase

from ..serializers import FriendRequestSerializer


class FriendRequestSerializerTests(TestCase):

    def test_CreateValid(self):
        # Arrange
        u = User.objects.create(username='username')
        r = User.objects.create(username='new_friend')
        data = {
            'creator': u.id,
            'receiver': r.id,
            'active': True
        }
        serializer = FriendRequestSerializer(data=data)

        # Act
        serializer.is_valid()
        friend_request = serializer.save()

        # Assert
        self.assertIsNotNone(friend_request)
        self.assertEqual(friend_request.creator.username, 'username')
        self.assertEqual(friend_request.receiver.username, 'new_friend')
