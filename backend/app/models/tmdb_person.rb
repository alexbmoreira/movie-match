class TmdbPerson < ActiveModelSerializers::Model
  attr_accessor :id,
    :name,
    :biography,
    :known_for_department,
    :profile_path,
    :cast_credits,
    :crew_credits,
    :known_for

  def initialize(object)
    super(
      id: object['id'],
      name: object['name'],
      biography: object['biography'],
      known_for_department: object['known_for_department'],
      profile_path: "#{Tmdb::IMAGE_PATH}#{Tmdb::POSTER_SIZE_LG}#{object['profile_path']}",
      known_for: object['known_for']&.map { TmdbMovie.new(_1) },
      cast_credits: object.dig('credits', 'cast')&.map { TmdbMovie.new(_1) },
      crew_credits: object.dig('credits', 'crew')&.map { TmdbMovie.new(_1) }
    )
  end
end
