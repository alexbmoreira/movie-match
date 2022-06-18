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
  end
end
