module Api
  module V1
    class FriendshipSerializer < ApplicationSerializer
      type 'friendships'

      attributes :created_at

      belongs_to :user, serializer: versioned_class(UserSerializer)
      belongs_to :friend, serializer: versioned_class(UserSerializer)

      link(:self) do
        methods = []
        methods << 'DELETE' if Friendships::Destroy.can_run?(friendship: object)

        {
          href: scope.versioned_url_for(:friendship, object),
          meta: {
            methods:
          }
        }
      end
    end
  end
end
