module Friendships
  class List < ApplicationInteraction
    def execute
      policy_scope(Friendship)
    end
  end
end
