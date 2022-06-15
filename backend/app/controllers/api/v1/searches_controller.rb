module Api
  module V1
    class SearchesController < ApplicationController
      skip_before_action :require_login, only: [:show]
      skip_after_action :verify_authorized, only: [:show]

      def show
        results = Search::Search.run(query: params[:query], type: params[:type])
        respond_with results, each_serializer: result_serializer, include: [:known_for]
      end

      private

      def result_serializer
        case params[:type]
        when 'movie'
          TmdbMovieSerializer
        when 'person'
          TmdbPersonSerializer
        end
      end
    end
  end
end
