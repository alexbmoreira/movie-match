from .. import interaction


class DestroyFriendship(interaction.Interaction):

    def execute(self, friendship):
        friendship.delete()