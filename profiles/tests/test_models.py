from django.test import TestCase

from ..models import User, Profile, FriendsList, FriendRequest


class FriendshipTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        User.objects.create(username="joey", email="joey@test.com")
        User.objects.create(username="carl", email="carl@test.com")
        User.objects.create(username="suzy", email="suzy@test.com")

    def test_AddOneFriend(self):
        # Arrange
        user1 = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        user3 = User.objects.get(id=3)
        
        frlst1 = FriendsList.objects.get(user=user1)
        frlst2 = FriendsList.objects.get(user=user2)
        frlst3 = FriendsList.objects.get(user=user3)

        # Act
        frlst1.friend(user2)

        # Assert
        user1_friends = list(frlst1.friends.all())
        user2_friends = list(frlst2.friends.all())
        self.assertEqual(user1_friends, [user2]) # Joey's friend is Carl
        self.assertEqual(user2_friends, [user1]) # Carl's friend is Joey

    def test_AddTwoFriends(self):
        # Arrange
        user1 = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        user3 = User.objects.get(id=3)
        
        frlst1 = FriendsList.objects.get(user=user1)
        frlst2 = FriendsList.objects.get(user=user2)
        frlst3 = FriendsList.objects.get(user=user3)

        # Act
        frlst1.friend(user2) # Joey and Carl are friends
        frlst1.friend(user3) # Joey and Suzy are friends

        # Assert
        user1_friends = list(frlst1.friends.all())
        user2_friends = list(frlst2.friends.all())
        user3_friends = list(frlst3.friends.all())
        self.assertEqual(user1_friends, [user2, user3]) # Joey's friends are Carl and Suzy
        self.assertEqual(user2_friends, [user1]) # Carl's friend is Joey
        self.assertEqual(user3_friends, [user1]) # Suzy's friend is Joey
