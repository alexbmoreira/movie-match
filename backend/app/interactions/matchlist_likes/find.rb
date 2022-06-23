module MatchlistLikes
  class Find < ApplicationInteraction
    string :id

    def execute
      policy_scope(MatchlistLike).find(id)
    end
  end
end
