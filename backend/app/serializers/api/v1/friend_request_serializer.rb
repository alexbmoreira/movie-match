module Api
  module V1
    class FriendRequestSerializer < ApplicationSerializer
      type 'friendRequests'

      attributes :created_at

      belongs_to :creator, serializer: versioned_class(UserDetailSerializer)
      belongs_to :receiver, serializer: versioned_class(UserDetailSerializer)
    end
  end
end
