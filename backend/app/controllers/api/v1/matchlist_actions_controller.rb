module Api
  module V1
    class MatchlistActionsController < ApplicationController
      def show
        respond_with MatchlistActions::Find.run!(params),
          serializer: versioned_class(MatchlistActionSerializer),
          include: [:user, :friend]
      end
    end
  end
end
