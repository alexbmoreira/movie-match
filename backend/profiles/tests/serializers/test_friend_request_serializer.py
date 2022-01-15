from django.test import RequestFactory, TestCase
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
      self.request = RequestFactory().post('./user/watchlist')
      self.request.user = self.creator
      self.serializer = FriendRequestSerializer(data=self.data, context={'request': self.request})

    def test_CreateValid(self):
        # Act
        self.serializer.is_valid()
        friend_request = self.serializer.save()

        # Assert
        self.assertIsNotNone(friend_request)
        self.assertEqual(friend_request.creator, self.creator)
        self.assertEqual(friend_request.receiver, self.receiver)
