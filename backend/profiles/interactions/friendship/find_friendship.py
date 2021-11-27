from profiles.models import Friendship

from .. import interaction


class FindFriendship(interaction.Interaction):

    def execute(self, user):
        return Friendship.objects.get_friendships(user)
