module Api
  module V1
    class SearchesController < ApplicationController
      def show
        results = Searches::Search.run(query: params[:query], scope: params[:scope])
        respond_with results, each_serializer: SearchResultSerializer
      end
    end
  end
end
