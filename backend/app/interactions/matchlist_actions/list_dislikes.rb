module MatchlistActions
  class ListDislikes < ApplicationInteraction
    def execute
      policy_scope(MatchlistDislike)
    end
  end
end
