module Api
  module V1
    class MatchlistActionSerializer < ApplicationSerializer
      type 'matchlistActions'

      attributes :created_at,
        :movie

      attribute(:action) { object.class.action }

      belongs_to :user, serializer: versioned_class(UserDetailSerializer)
      belongs_to :friend, serializer: versioned_class(UserDetailSerializer)
    end
  end
end
