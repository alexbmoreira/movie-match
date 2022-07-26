module Api
  module V1
    class UsersController < ApplicationController
      def show
        respond_with Users::Find.run!(params),
          serializer: versioned_class(UserDetailSerializer),
          include: [:friend_request, :friendship]
      end
    end
  end
end
