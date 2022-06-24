module Api
  module V1
    class MatchlistActionsController < ApplicationController
      def show
        respond_with MatchlistActions::Find.run!(params),
          serializer: versioned_class(MatchlistActionSerializer),
          include: [:user, :friend]
      end

      def destroy
        respond_with MatchlistActions::Destroy.run(matchlist_action: find_matchlist_action!),
          serializer: versioned_class(MatchlistActionSerializer),
          include: [:user, :friend]
      end

      private

      def find_matchlist_action!
        MatchlistActions::Find.run!(id: params[:id])
      end
    end
  end
end
