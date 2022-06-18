module FriendRequests
  class InteractionPolicy < ApplicationPolicy
    def find?
      true
    end

    def list?
      true
    end

    def create?
      true
    end

    def destroy?
      record.friend_request.creator.id == user.id || record.friend_request.receiver.id == user.id
    end
  end
end