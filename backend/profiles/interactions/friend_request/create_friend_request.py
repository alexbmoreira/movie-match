from profiles.models import FriendRequest

from .. import interaction


class CreateFriendRequest(interaction.Interaction):

    def execute(self, creator, **data):
        return FriendRequest.objects.create(creator=creator, **data)
