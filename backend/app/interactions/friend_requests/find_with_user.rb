module FriendRequests
  class FindWithUser < ApplicationInteraction
    object :user, class: User

    def execute
      policy_scope(FriendRequest).find_by('creator_id = ? OR receiver_id = ?', user.id, user.id)
    end
  end
end
