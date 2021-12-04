from profiles.models import WatchlistMovie

from .. import interaction


class CreateWatchlistMovie(interaction.Interaction):

    def execute(self, user, movie):
        return WatchlistMovie.objects.create(user=user, movie=movie)
