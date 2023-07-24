module Api
  module V1
    class MatchlistActionsController < ApplicationController
      def destroy
        respond_with MatchlistActions::Destroy.run(matchlist_action: find_matchlist_action!),
          serializer: versioned_class(MatchlistActionSerializer),
          include: [:user, :friend]
      end

      private

      def find_matchlist_action!
        MatchlistActions::Base.find(id: params[:id])
      end
    end
  end
end
