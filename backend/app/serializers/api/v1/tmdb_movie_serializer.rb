module Api
  module V1
    class TmdbMovieSerializer < ApplicationSerializer
      type 'tmdbMovies'

      attributes :id,
        :title,
        :release_date,
        :runtime,
        :poster_thumb,
        :poster_path

      attribute(:release_year) { Date.parse(object.release_date).year }
    end
  end
end
