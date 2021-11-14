from django.contrib.auth.models import User
from django.db import models


class WatchlistMovie(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.IntegerField(blank=True, default=list)

    class Meta:
        unique_together = ['user', 'movie']

    def __str__(self):
        return f"({self.id}) {self.user} wants to watch {self.movie}"
