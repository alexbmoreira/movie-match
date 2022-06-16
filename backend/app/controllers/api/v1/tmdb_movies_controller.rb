module Api
  module V1
    class TmdbMoviesController < ApplicationController
      skip_after_action :verify_authorized, only: [:show]

      def show
        respond_with TmdbDetails::Movie.run(id: params[:id]),
          serializer: TmdbMovieDetailSerializer, include: [:cast_members, :crew_members]
      end
    end
  end
end
