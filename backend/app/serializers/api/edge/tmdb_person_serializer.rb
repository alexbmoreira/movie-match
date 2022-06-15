module Api
  module Edge
    class TmdbPersonSerializer < ApplicationSerializer
      type 'tmdbPeople'

      attributes :id,
        :name,
        :known_for_department,
        :profile_path

      has_many :known_for,
        serializer: versioned_class(TmdbMovieSerializer)
    end
  end
end
