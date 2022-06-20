module Friendships
  class Destroy < ApplicationInteraction
    object :friendship, class: Friendship

    def execute
      friendship.destroy
      friendship
    end
  end
end
