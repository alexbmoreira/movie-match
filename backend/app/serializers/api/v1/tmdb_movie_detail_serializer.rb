module Api
  module V1
    class TmdbMovieDetailSerializer < ApplicationSerializer
      type 'tmdbMovies'

      attributes :id,
        :title,
        :overview,
        :release_date,
        :runtime,
        :poster_thumb,
        :poster_path,
        :release_year

      has_many :cast_members,
        serializer: versioned_class(TmdbPersonSerializer)
      has_many :crew_members,
        serializer: versioned_class(TmdbPersonSerializer)
    end
  end
end
