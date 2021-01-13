from django.test import TestCase

from ..models import User, Profile, FriendsList, FriendRequest


class FriendsListTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        User.objects.create(username="joey", email="joey@test.com")
        User.objects.create(username="carl", email="carl@test.com")
        User.objects.create(username="suzy", email="suzy@test.com")

    def test_AddOneFriend(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")
        
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
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")
        
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

    def test_UnfriendOneFriend(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")
        
        frlst1 = FriendsList.objects.get(user=user1)
        frlst2 = FriendsList.objects.get(user=user2)
        frlst3 = FriendsList.objects.get(user=user3)

        frlst1.friends.add(user2, user3)
        frlst2.friends.add(user1, user3)
        frlst3.friends.add(user1, user2)

        # Act
        frlst1.unfriend(user2) # Joey unfriends Carl

        # Assert
        user1_friends = list(frlst1.friends.all())
        user2_friends = list(frlst2.friends.all())
        self.assertEqual(user1_friends, [user3]) # Joey's only friend is now Suzy
        self.assertEqual(user2_friends, [user3]) # Carl's only friend is now Suzy

    def test_UnfriendTwoFriends(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")
        
        frlst1 = FriendsList.objects.get(user=user1)
        frlst2 = FriendsList.objects.get(user=user2)
        frlst3 = FriendsList.objects.get(user=user3)

        frlst1.friends.add(user2, user3)
        frlst2.friends.add(user1, user3)
        frlst3.friends.add(user1, user2)

        # Act
        frlst1.unfriend(user2) # Joey unfriends Carl
        frlst1.unfriend(user3) # Joey unfriends Suzy

        # Assert
        user1_friends = list(frlst1.friends.all())
        user2_friends = list(frlst2.friends.all())
        user3_friends = list(frlst3.friends.all())
        self.assertEqual(user1_friends, []) # Joey now has no friends
        self.assertEqual(user2_friends, [user3]) # Carl's only friend is now Suzy
        self.assertEqual(user3_friends, [user2]) # Suzy's only friend is now Carl


class FriendRequestTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        User.objects.create(username="joey", email="joey@test.com")
        User.objects.create(username="carl", email="carl@test.com")
        User.objects.create(username="suzy", email="suzy@test.com")

    def test_AcceptRequest(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        FriendRequest.objects.create(creator=user1, receiver=user3)
        req1 = FriendRequest.objects.get(creator=user1, receiver=user3) # Joey sends a request to Suzy

        # Act
        req1.accept()

        # Assert
        user1_friends = list(FriendsList.objects.get(user=user1).friends.all())
        user3_friends = list(FriendsList.objects.get(user=user3).friends.all())
        self.assertEqual(req1.active, False)
        self.assertEqual(user1_friends, [user3]) # Joey's friend is Suzy
        self.assertEqual(user3_friends, [user1]) # Suzy's friend is Joey

    def test_DeclineRequest(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        FriendRequest.objects.create(creator=user1, receiver=user2)
        req2 = FriendRequest.objects.get(creator=user1, receiver=user2) # Joey sends a request to Carl

        # Act
        req2.decline()

        # Assert
        user1_friends = list(FriendsList.objects.get(user=user1).friends.all())
        user3_friends = list(FriendsList.objects.get(user=user3).friends.all())
        self.assertEqual(req2.active, False)
        self.assertEqual(user1_friends, []) # Joey has no friends
        self.assertEqual(user3_friends, []) # Carl has no friends
