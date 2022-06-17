module Api
  module V1
    class SearchesController < ApplicationController
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
