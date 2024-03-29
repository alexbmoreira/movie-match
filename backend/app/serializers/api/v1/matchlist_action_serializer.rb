module Api
  module V1
    class MatchlistActionSerializer < ApplicationSerializer
      type 'matchlistActions'

      attributes :created_at,
        :movie

      attribute(:action) { object.class.action }

      def movie
        TmdbMovieSerializer.new(object.movie)
      end
    end
  end
end
