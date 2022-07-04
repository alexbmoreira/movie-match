module Api
  module V1
    class UserDetailSerializer < ApplicationSerializer
      type 'users'

      attributes :username

      attribute(:avatar_color) { Avatar.color(object.avatar_color.to_sym) }
      attribute(:avatar_initial) { Avatar.initial(object.username) }

      link(:send_friend_request) do
        next if object.id == scope.user.id
        next if Friendships::FindWithUser.run!(user: object)
        next if FriendRequests::FindWithUser.run!(user: object)

        {
          href: scope.versioned_url_for(:friend_requests),
          meta: {
            methods: ['POST']
          }
        }
      end
    end
  end
end
