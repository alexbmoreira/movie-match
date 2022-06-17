module Api
  module V1
    class TmdbPeopleController < ApplicationController
      skip_after_action :verify_authorized, only: [:show]

      def show
        respond_with TmdbDetails::Person.run(id: params[:id]),
          serializer: TmdbPersonDetailSerializer, include: [:cast_credits, :crew_credits]
      end
    end
  end
end
