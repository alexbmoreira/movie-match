module MatchlistActions
  class ListLikes < ApplicationInteraction
    def execute
      policy_scope(MatchlistLike)
    end
  end
end
