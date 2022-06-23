module MatchlistLikes
  class List < ApplicationInteraction
    def execute
      policy_scope(MatchlistLike)
    end
  end
end
