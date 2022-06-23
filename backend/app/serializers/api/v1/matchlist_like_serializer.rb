module Api
  module V1
    class MatchlistLikeSerializer < ApplicationSerializer
      type 'matchlistLikes'

      attributes :created_at,
        :movie

      belongs_to :user, serializer: versioned_class(UserDetailSerializer)
      belongs_to :friend, serializer: versioned_class(UserDetailSerializer)
    end
  end
end
