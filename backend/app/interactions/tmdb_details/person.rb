module TmdbDetails
  class Person < ApplicationInteraction
    integer :id

    def execute
      person = Tmdb::Person.detail(id)
      person['credits'] = Tmdb::Person.credits(id)
      TmdbPerson.new(person)
    end
  end
end
