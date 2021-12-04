from profiles.models import WatchlistMovie

from .. import interaction


class DestroyWatchlistMovie(interaction.Interaction):

    def execute(self, movie):
        movie.delete()
