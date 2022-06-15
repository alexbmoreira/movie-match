module Api
  module V1
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
