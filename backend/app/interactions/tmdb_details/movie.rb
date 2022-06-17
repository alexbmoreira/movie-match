module TmdbDetails
  class Movie < ApplicationInteraction
    integer :id

    def execute
      movie = Tmdb::Movie.detail(id)
      movie['cast'] = Tmdb::Movie.casts(id)
      movie['crew'] = Tmdb::Movie.crew(id)
      TmdbMovie.new(movie)
    end
  end
end
