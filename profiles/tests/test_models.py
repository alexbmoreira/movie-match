from datetime import timedelta

from django.test import TestCase
from django.utils import timezone

from ..models import (FriendRequest, FriendsList, JointWatchlist, Matchlist,
                      MovieLike, Profile, User, Watchlist)


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


class WatchListTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        User.objects.create(username="joey", email="joey@test.com")
        User.objects.create(username="carl", email="carl@test.com")
        User.objects.create(username="suzy", email="suzy@test.com")

    def test_AddOneToWatchlist(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        w_list1 = Watchlist.objects.get(user=user1)

        # Act
        w_list1.add_movie(4995) # Add Boogie Nights by TMDB movie id

        # Assert
        self.assertEqual(w_list1.watchlist, [4995]) # Boogie Nights is in Joey's watchlist

    def test_RemoveOneFromWatchlist(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        w_list1 = Watchlist.objects.get(user=user1)
        w_list1.watchlist.append(4995) # Add Boogie Nights by TMDB movie id
        w_list1.watchlist.append(68718) # Add Django Unchained by TMDB movie id

        # Act
        w_list1.remove_movie(68718) # Remove Django Unchained by TMDB movie id

        # Assert
        self.assertEqual(w_list1.watchlist, [4995]) # Only Boogie Nights is left in Joey's watchlist


class JointWatchlistTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        User.objects.create(username="joey", email="joey@test.com")
        User.objects.create(username="carl", email="carl@test.com")
        User.objects.create(username="suzy", email="suzy@test.com")

    def test_JointWatchlistsSomeMatchSomeDont(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        w_list1 = Watchlist.objects.get(user=user1)
        w_list1.watchlist.append(4995) # Add Boogie Nights by TMDB movie id
        w_list1.watchlist.append(68718) # Add Django Unchained by TMDB movie id
        w_list1.save()

        w_list2 = Watchlist.objects.get(user=user2)
        w_list2.watchlist.append(4995) # Add Boogie Nights by TMDB movie id
        w_list2.watchlist.append(278) # Add Shawshank Redemption by TMDB movie id
        w_list2.save()

        j_w = JointWatchlist.objects.create(user1=user1, user2=user2)

        #Act
        j_w.save()

        #Assert
        self.assertEqual(j_w.shared_watchlist, [4995])
        self.assertEqual(j_w.indiv_watchlist, [68718, 278])

    def test_JointWatchlistsAllMatch(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        w_list1 = Watchlist.objects.get(user=user1)
        w_list1.watchlist.append(4995) # Add Boogie Nights by TMDB movie id
        w_list1.watchlist.append(278) # Add Django Unchained by TMDB movie id
        w_list1.save()

        w_list2 = Watchlist.objects.get(user=user2)
        w_list2.watchlist.append(4995) # Add Boogie Nights by TMDB movie id
        w_list2.watchlist.append(278) # Add Shawshank Redemption by TMDB movie id
        w_list2.save()

        j_w = JointWatchlist.objects.create(user1=user1, user2=user2)

        #Act
        j_w.save()

        #Assert
        self.assertEqual(j_w.shared_watchlist, [4995, 278])
        self.assertEqual(j_w.indiv_watchlist, [])

    def test_JointWatchlistsNoneMatch(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        w_list1 = Watchlist.objects.get(user=user1)
        w_list1.watchlist.append(4995) # Add Boogie Nights by TMDB movie id
        w_list1.watchlist.append(68718) # Add Django Unchained by TMDB movie id
        w_list1.save()

        w_list2 = Watchlist.objects.get(user=user2)
        w_list2.watchlist.append(508442) # Add Soul by TMDB movie id
        w_list2.watchlist.append(278) # Add Shawshank Redemption by TMDB movie id
        w_list2.save()

        j_w = JointWatchlist.objects.create(user1=user1, user2=user2)

        #Act
        j_w.save()

        #Assert
        self.assertEqual(j_w.shared_watchlist, [])
        self.assertEqual(j_w.indiv_watchlist, [4995, 68718, 508442, 278])


class MatchlistTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        User.objects.create(username="joey", email="joey@test.com")
        User.objects.create(username="carl", email="carl@test.com")
        User.objects.create(username="suzy", email="suzy@test.com")
        Matchlist.objects.create(user=User.objects.get(username="joey"), friend=User.objects.get(username="carl"))
        Matchlist.objects.create(user=User.objects.get(username="carl"), friend=User.objects.get(username="joey"))

    def test_MatchlistMatch(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        m_list1 = Matchlist.objects.get(user=user1, friend=user2)
        m_list2 = Matchlist.objects.get(user=user2, friend=user1)

        m_list1.likes.append(4995) # Add Boogie Nights by TMDB movie id
        m_list1.likes.append(68718) # Add Django Unchained by TMDB movie id
        m_list1.save()

        m_list2.likes.append(4995) # Add Boogie Nights by TMDB movie id
        m_list2.likes.append(278) # Add Shawshank Redemption by TMDB movie id
        m_list2.save()

        #Act
        m_list1.get_matches()
        m_list2.get_matches()

        #Assert
        self.assertEqual(m_list1.matches, [4995]) # Joey and Carl matched on Boogie Nights
        self.assertEqual(m_list2.matches, [4995])

    def test_MatchlistLike(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        m_list1 = Matchlist.objects.get(user=user1, friend=user2)

        #Act
        m_list1.like_movie(4995) # Like Boogie Nights by TMDB movie id
        m_list1.like_movie(68718) # Like Django Unchained by TMDB movie id
        m_list1.save()

        #Assert
        self.assertEqual(m_list1.likes, [4995, 68718]) # Joey liked Boogie Nights and Django Unchained

    def test_MatchlistLikeUnlike(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        m_list1 = Matchlist.objects.get(user=user1, friend=user2)

        #Act
        m_list1.like_movie(4995) # Like Boogie Nights by TMDB movie id
        m_list1.like_movie(68718) # Like Django Unchained by TMDB movie id
        m_list1.unlike_movie(4995) # Unliked Boogie Nights
        m_list1.save()

        #Assert
        self.assertEqual(m_list1.likes, [68718]) # Only Django Unchained is in Joey's likes

    def test_MatchlistDislike(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        m_list1 = Matchlist.objects.get(user=user1, friend=user2)

        #Act
        m_list1.dislike_movie(13223) # Dislike Gran Torino by TMDB movie id
        m_list1.dislike_movie(464052) # Dislike WW84 by TMDB movie id
        m_list1.save()

        #Assert
        self.assertEqual(m_list1.dislikes, [13223, 464052]) # Joey disliked WW84 and Gran Torino

    def test_MatchlistDislikeUndislike(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        m_list1 = Matchlist.objects.get(user=user1, friend=user2)

        #Act
        m_list1.dislike_movie(13223) # Like Gran Torino by TMDB movie id
        m_list1.dislike_movie(464052) # Like WW84 by TMDB movie id
        m_list1.undislike_movie(13223) # Unliked Gran Torino
        m_list1.save()

        #Assert
        self.assertEqual(m_list1.dislikes, [464052]) # Only WW84 is in Joey's likes

    def test_MatchlistsSomeMatchSomeDont(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        w_list1 = Watchlist.objects.get(user=user1)
        w_list1.watchlist.append(4995) # Add Boogie Nights by TMDB movie id
        w_list1.watchlist.append(68718) # Add Django Unchained by TMDB movie id
        w_list1.save()

        w_list2 = Watchlist.objects.get(user=user2)
        w_list2.watchlist.append(4995) # Add Boogie Nights by TMDB movie id
        w_list2.watchlist.append(278) # Add Shawshank Redemption by TMDB movie id
        w_list2.save()

        m_list1 = Matchlist.objects.get(user=user1, friend=user2)
        m_list2 = Matchlist.objects.get(user=user2, friend=user1)

        #Act
        m_list1.save()
        m_list2.save()

        #Assert
        self.assertEqual(m_list1.shared_watchlist, [4995])
        self.assertEqual(m_list1.indiv_watchlist, [68718, 278])
        self.assertEqual(m_list2.shared_watchlist, [4995])
        self.assertEqual(m_list2.indiv_watchlist, [278, 68718])

    def test_MatchlistsAllMatch(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        w_list1 = Watchlist.objects.get(user=user1)
        w_list1.watchlist.append(4995) # Add Boogie Nights by TMDB movie id
        w_list1.watchlist.append(278) # Add Django Unchained by TMDB movie id
        w_list1.save()

        w_list2 = Watchlist.objects.get(user=user2)
        w_list2.watchlist.append(4995) # Add Boogie Nights by TMDB movie id
        w_list2.watchlist.append(278) # Add Shawshank Redemption by TMDB movie id
        w_list2.save()

        m_list1 = Matchlist.objects.get(user=user1, friend=user2)
        m_list2 = Matchlist.objects.get(user=user2, friend=user1)

        #Act
        m_list1.save()
        m_list2.save()

        #Assert
        self.assertEqual(m_list1.shared_watchlist, [4995, 278])
        self.assertEqual(m_list1.indiv_watchlist, [])
        self.assertEqual(m_list2.shared_watchlist, [4995, 278])
        self.assertEqual(m_list2.indiv_watchlist, [])

    def test_MatchlistsNoneMatch(self):
        # Arrange
        user1 = User.objects.get(username="joey")
        user2 = User.objects.get(username="carl")
        user3 = User.objects.get(username="suzy")

        w_list1 = Watchlist.objects.get(user=user1)
        w_list1.watchlist.append(4995) # Add Boogie Nights by TMDB movie id
        w_list1.watchlist.append(68718) # Add Django Unchained by TMDB movie id
        w_list1.save()

        w_list2 = Watchlist.objects.get(user=user2)
        w_list2.watchlist.append(508442) # Add Soul by TMDB movie id
        w_list2.watchlist.append(278) # Add Shawshank Redemption by TMDB movie id
        w_list2.save()

        m_list1 = Matchlist.objects.get(user=user1, friend=user2)
        m_list2 = Matchlist.objects.get(user=user2, friend=user1)

        #Act
        m_list1.save()
        m_list2.save()

        #Assert
        self.assertEqual(m_list1.shared_watchlist, [])
        self.assertEqual(m_list1.indiv_watchlist, [4995, 68718, 508442, 278])
        self.assertEqual(m_list2.shared_watchlist, [])
        self.assertEqual(m_list2.indiv_watchlist, [508442, 278, 4995, 68718])


class MovieLikeTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        MovieLike.objects.create(movie=4995)

    def test_MovieLikeTimeAdded(self):
        # Arrange
        ml = MovieLike.objects.get(movie=4995)
        ml.datetime_added = timezone.now() - timedelta(1)

        #Act
        hours_since = ml.get_hours_since_adding()

        #Assert
        self.assertEqual(hours_since, 24) # Only WW84 is in Joey's likes
