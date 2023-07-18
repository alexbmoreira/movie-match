module Api
  module V1
    class TmdbMovieSerializer < ApplicationSerializer
      type 'tmdbMovies'

      attributes :id,
        :title,
        :release_date,
        :poster_thumb,
        :poster_path
    end
  end
end
