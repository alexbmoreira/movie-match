from django.db import models

from .user import User


class MatchlistDislike(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matchlist_dislikes')
    friend = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.IntegerField(blank=True, default=list)

    class Meta:
        unique_together = ['user', 'friend', 'movie']

    def __str__(self):
        return f"({self.id}) {self.user.username} disliked {self.movie} in their matchlist with {self.friend}"
