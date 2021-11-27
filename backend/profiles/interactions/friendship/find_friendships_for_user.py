from profiles.models import Friendship

from .. import interaction


class FindFriendshipsForUser(interaction.Interaction):

    def execute(self, user):
        return Friendship.objects.get_friendships(user)
