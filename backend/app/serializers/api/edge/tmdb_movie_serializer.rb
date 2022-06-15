module Api
  module Edge
    class TmdbMovieSerializer < ApplicationSerializer
      type 'tmdbMovies'

      attributes :id,
        :title,
        :overview,
        :release_date,
        :poster_path
    end
  end
end
