module MovieDb
  class Person < ActiveModelSerializers::Model
    attr_accessor :id,
      :name,
      :known_for_department,
      :profile_path,
      :credits,
      :known_for

    def initialize(object)
      super(
        id: object['id'],
        name: object['name'],
        known_for_department: object['known_for_department'],
        profile_path: object['profile_path'],
        known_for: object['known_for'].map { MovieDb::Movie.new(_1) }
      )
    end
  end
end
