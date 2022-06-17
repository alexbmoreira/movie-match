class TmdbMovie < ActiveModelSerializers::Model
  attr_accessor :id,
    :title,
    :overview,
    :release_date,
    :poster_path,
    :cast_members,
    :crew_members

  def initialize(object)
    super(
      id: object['id'],
      title: object['title'],
      overview: object['overview'],
      release_date: object['release_date'],
      poster_path: object['poster_path'],
      cast_members: object['cast']&.map { TmdbPerson.new(_1) },
      crew_members: object['crew']&.map { TmdbPerson.new(_1) }
    )
  end
end
