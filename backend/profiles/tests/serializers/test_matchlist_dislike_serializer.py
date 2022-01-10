from django.test import RequestFactory, TestCase
from profiles.serializers import MatchlistDislikeSerializer

from ..factories import UserFactory


class MatchlistLikeSerializerTests(TestCase):

    def setUp(self):
        self.user = UserFactory(username='peter_griffin')
        self.friend = UserFactory(username='joe_swanson')
        self.data = {
            'movie': 4995
        }
        self.request = RequestFactory().post('./matchlists/<id>/dislikes/')
        self.request.user = self.user
        self.serializer = MatchlistDislikeSerializer(data=self.data, context={'request': self.request, 'user_id': self.friend.id}) 

    def test_CreateValid(self):
        # Act
        self.serializer.is_valid()
        matchlist_like = self.serializer.save()

        # Assert
        self.assertIsNotNone(matchlist_like)
        self.assertEqual(matchlist_like.user, self.user)
        self.assertEqual(matchlist_like.friend, self.friend)
        self.assertEqual(matchlist_like.movie, 4995)


