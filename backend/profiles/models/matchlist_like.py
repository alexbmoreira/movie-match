from django.contrib.auth.models import User
from django.db import models


class MatchlistLike(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matchlist_likes')
    friend = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.IntegerField(blank=True, default=list)

    class Meta:
        unique_together = ['user', 'friend', 'movie']

    def __str__(self):
        return f"({self.id}) {self.user} liked {self.movie} in their matchlist with {self.friend}"