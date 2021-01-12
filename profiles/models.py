from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class FriendsList(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user')
    friends = models.ManyToManyField(User, blank=True, related_name='friends')

    def __str__(self):
        return self.user.username

    def add_friend(self, new_friend):
        if new_friend not in self.friends.all():
            self.friends.add(new_friend)

    def friend(self, new_friend):
        self.add_friend(new_friend)

        other_list = FriendsList.objects.get(user=new_friend)
        other_list.add_friend(self.user)

    def remove_friend(self, friend):
        if friend in self.friends.all():
            self.friends.remove(friend)

    def unfriend(self, friend):
        self.remove_friend(friend)

        other_list = FriendsList.objects.get(user=friend)
        other_list.remove_friend(self.user)


class FriendRequest(models.Model):

    creator = models.ForeignKey(User, related_name='request_creator', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='request_friend', on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    def accept(self):
        creator_list = FriendsList.objects.get(user=self.creator)
        creator_list.friend(self.receiver)
        self.active = False
    
    def decline(self):
        self.active = False
    
    def cancel(self):
        self.active = False
