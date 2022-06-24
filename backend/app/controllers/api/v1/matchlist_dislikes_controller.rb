module Api
  module V1
    class MatchlistDislikesController < ApplicationController
      def index
        respond_with MatchlistActions::ListDislikes.run!(params),
          each_serializer: versioned_class(MatchlistActionSerializer),
          include: [:user, :friend]
      end
    end
  end
end
