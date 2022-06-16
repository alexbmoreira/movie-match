module Api
  module V1
    class TmdbPersonDetailSerializer < ApplicationSerializer
      type 'tmdbPersonDetails'

      attributes :id,
        :name,
        :biography,
        :known_for_department,
        :profile_path

      has_many :cast_credits,
        serializer: versioned_class(TmdbMovieSerializer)
      has_many :crew_credits,
        serializer: versioned_class(TmdbMovieSerializer)
    end
  end
end
