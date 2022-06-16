module Api
  module V1
    class TmdbMovieDetailSerializer < ApplicationSerializer
      type 'tmdbMovieDetails'

      attributes :id,
        :title,
        :overview,
        :release_date,
        :poster_path

      has_many :cast_members,
        serializer: versioned_class(TmdbPersonSerializer)
      has_many :crew_members,
        serializer: versioned_class(TmdbPersonSerializer)
    end
  end
end
