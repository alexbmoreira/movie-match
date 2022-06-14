module MovieDb
  class Movie < ActiveModelSerializers::Model
    attr_accessor :id,
      :title,
      :overview,
      :release_date,
      :poster_path
  end
end
