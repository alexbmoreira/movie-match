module MatchlistLikes
  class Destroy < ApplicationInteraction
    object :matchlist_like, class: MatchlistLike

    def execute
      matchlist_like.destroy
      matchlist_like
    end
  end
end
