module Api
  module V1
    class FriendshipSerializer < ApplicationSerializer
      type 'friendships'

      attributes :created_at

      belongs_to :user, serializer: versioned_class(UserDetailSerializer)
      belongs_to :friend, serializer: versioned_class(UserDetailSerializer)
    end
  end
end
