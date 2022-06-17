class FriendRequestPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      FriendRequest.where('creator_id = ? OR receiver_id = ?', user.id, user.id)
    end
  end
end
