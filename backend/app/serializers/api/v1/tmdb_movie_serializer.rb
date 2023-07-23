module Api
  module V1
    class TmdbMovieSerializer < ApplicationSerializer
      type 'tmdbMovies'

      attributes :id,
        :title,
        :release_date,
        :runtime,
        :poster_thumb,
        :poster_path,
        :release_year
    end
  end
end
