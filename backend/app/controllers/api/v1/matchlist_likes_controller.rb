module Api
  module V1
    class MatchlistLikesController < ApplicationController
      def index
        respond_with MatchlistActions::ListLikes.run!(params),
          each_serializer: versioned_class(MatchlistActionSerializer),
          include: [:user, :friend]
      end
    end
  end
end
