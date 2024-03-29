module Api
  module V1
    class TmdbPersonSerializer < ApplicationSerializer
      type 'tmdbPeople'

      attributes :id,
        :name,
        :known_for_department,
        :profile_path
    end
  end
end
