from django.test import TestCase, TransactionTestCase

from ..models import User, Profile, Friendship


class FriendshipTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        User.objects.create(username="joey", email="joey@test.com")
        User.objects.create(username="carl", email="carl@test.com")
        User.objects.create(username="suzy", email="suzy@test.com")

    def test_GetFriendsList_TwoAccepted(self):
        # Arrange
        user1 = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        user3 = User.objects.get(id=3)
        profile1 = Profile.objects.get(id=1)
        profile2 = Profile.objects.get(id=2)
        profile3 = Profile.objects.get(id=3)

        friendship = Friendship.objects.create(creator=user1, friend=user2, accepted=True)
        friendship = Friendship.objects.create(creator=user2, friend=user3, accepted=True)

        # Act

        # Assert
        self.assertEqual(profile2.get_friends(), [user1, user3]) # Get carl's friends; gets joey and suzy

    def test_GetFriendsList_OneAccepted(self):
        # Arrange
        user1 = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        user3 = User.objects.get(id=3)
        profile1 = Profile.objects.get(id=1)
        profile2 = Profile.objects.get(id=2)
        profile3 = Profile.objects.get(id=3)

        friendship = Friendship.objects.create(creator=user1, friend=user2, accepted=True)
        friendship = Friendship.objects.create(creator=user2, friend=user3, accepted=False)

        # Act

        # Assert
        self.assertEqual(profile2.get_friends(), [user1]) # Get carl's friends; gets joey

    def test_GetIncomingRequests_OneAccepted(self):
        # Arrange
        user1 = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        user3 = User.objects.get(id=3)
        profile1 = Profile.objects.get(id=1)
        profile2 = Profile.objects.get(id=2)
        profile3 = Profile.objects.get(id=3)

        friendship = Friendship.objects.create(creator=user1, friend=user2, accepted=True)
        friendship = Friendship.objects.create(creator=user3, friend=user2, accepted=False)

        # Act

        # Assert
        self.assertEqual(profile2.get_incoming_requests(), [user3]) # Get carl's friend requests; gets suzy

    def test_GetIncomingRequests_NoneAccepted(self):
        # Arrange
        user1 = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        user3 = User.objects.get(id=3)
        profile1 = Profile.objects.get(id=1)
        profile2 = Profile.objects.get(id=2)
        profile3 = Profile.objects.get(id=3)

        friendship = Friendship.objects.create(creator=user1, friend=user2, accepted=False)
        friendship = Friendship.objects.create(creator=user3, friend=user2, accepted=False)

        # Act

        # Assert
        self.assertEqual(profile2.get_incoming_requests(), [user1, user3]) # Get carl's friend requests; gets joey and suzy

    def test_GetSentRequests_OneAccepted(self):
        # Arrange
        user1 = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        user3 = User.objects.get(id=3)
        profile1 = Profile.objects.get(id=1)
        profile2 = Profile.objects.get(id=2)
        profile3 = Profile.objects.get(id=3)

        friendship = Friendship.objects.create(creator=user2, friend=user1, accepted=True)
        friendship = Friendship.objects.create(creator=user2, friend=user3, accepted=False)

        # Act

        # Assert
        self.assertEqual(profile2.get_sent_requests(), [user3]) # Get carl's friend requests; gets suzy

    def test_GetSentRequests_NoneAccepted(self):
        # Arrange
        user1 = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        user3 = User.objects.get(id=3)
        profile1 = Profile.objects.get(id=1)
        profile2 = Profile.objects.get(id=2)
        profile3 = Profile.objects.get(id=3)

        friendship = Friendship.objects.create(creator=user2, friend=user1, accepted=False)
        friendship = Friendship.objects.create(creator=user2, friend=user3, accepted=False)

        # Act

        # Assert
        self.assertEqual(profile2.get_sent_requests(), [user1, user3]) # Get carl's friend requests; gets joey and suzy