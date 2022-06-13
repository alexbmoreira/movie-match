module Api
  module Edge
    class TmdbMovieSerializer < ActiveModel::Serializer
      type 'tmdbMovies'

      attributes :id,
        :title,
        :overview,
        :release_date,
        :poster_path
    end
  end
end
