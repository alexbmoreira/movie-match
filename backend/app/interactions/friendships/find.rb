module Friendships
  class Find < ApplicationInteraction
    string :id

    def execute
      policy_scope(Friendship).find(id)
    end
  end
end
