from django.test import RequestFactory, TestCase
from profiles.models import User
from profiles.serializers import FriendRequestSerializer

from ..factories import UserFactory


class FriendRequestSerializerTests(TestCase):

    def setUp(self):
      self.creator = UserFactory(username='big_daddy')
      self.receiver = UserFactory(username='little_nicky')
      self.data = {
        "creator_id": self.creator.id,
        "receiver_id": self.receiver.id
      }
      self.serializer = FriendRequestSerializer(data=self.data)

    def test_CreateValid(self):
        # Act
        self.serializer.is_valid()
        friend_request = self.serializer.save()

        # Assert
        self.assertIsNotNone(friend_request)
        self.assertEqual(friend_request.creator, self.creator)
        self.assertEqual(friend_request.receiver, self.receiver)
