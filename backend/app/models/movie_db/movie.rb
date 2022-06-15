module MovieDb
  class Movie < ActiveModelSerializers::Model
    attr_accessor :id,
      :title,
      :overview,
      :release_date,
      :poster_path

    def initialize(object)
      super(
        id: object['id'],
        title: object['title'],
        overview: object['overview'],
        release_date: object['release_date'],
        poster_path: object['poster_path']
      )
    end
  end
end
