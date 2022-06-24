module Api
  module V1
    class FriendRequestSerializer < ApplicationSerializer
      type 'friendRequests'

      attributes :created_at

      belongs_to :creator, serializer: versioned_class(UserDetailSerializer)
      belongs_to :receiver, serializer: versioned_class(UserDetailSerializer)

      link(:self) do
        methods = []
        methods << 'DELETE' if FriendRequests::Destroy.can_run?(friend_request: object)

        {
          href: scope.versioned_url_for(:friend_request, object),
          meta: {
            methods:
          }
        }
      end

      link(:accept) do
        next unless FriendRequests::Accept.can_run?(friend_request: object)

        {
          href: scope.versioned_url_for(:friend_request, object, action: :accept),
          meta: {
            methods: ['PATCH']
          }
        }
      end
    end
  end
end
