from django.db import models

from .user import User


class WatchlistMovie(models.Model):

    user = models.ForeignKey(User, related_name='watchlist', on_delete=models.CASCADE)
    movie = models.IntegerField(blank=True, default=list)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'movie']
        ordering = ['-added_at']

    def __str__(self):
        return f"({self.id}) {self.user.username} wants to watch {self.movie}"
