module Api
  module V1
    class TmdbMoviesController < ApplicationController
      def show
        respond_with TmdbDetails::Movie.run(id: params[:id]),
          serializer: TmdbMovieDetailSerializer, include: [:cast_members, :crew_members]
      end
    end
  end
end
