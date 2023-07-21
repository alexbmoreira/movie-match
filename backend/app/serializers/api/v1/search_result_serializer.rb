module Api
  module V1
    class SearchResultSerializer < ApplicationSerializer
      type 'searchResults'

      attribute(:resultType) do
        case object
        when TmdbMovie
          'movie'
        when TmdbPerson
          'person'
        when User
          'user'
        end
      end

      attribute(:args) do
        case object
        when TmdbMovie
          {
            title: object.title,
            release_date: object.release_date,
            poster_thumb: object.poster_thumb,
            poster_path: object.poster_path,
            release_year: object.release_year
          }
        when TmdbPerson
          {
            name: object.name,
            biography: object.biography,
            known_for_department: object.known_for_department,
            profile_path: object.profile_path,
            known_for: object.known_for,
            cast_credits: object.cast_credits,
            crew_credits: object.crew_credits
          }
        when User
          {
            username: object.username,
            avatar_color: Avatar.color(object.avatar_color.to_sym),
            avatar_initial: Avatar.initial(object.username)
          }
        end
      end

      def id
        "#{id_prefix}#{object.id}"
      end

      private

      def id_prefix
        case object
        when TmdbMovie
          'm-'
        when TmdbPerson
          'p-'
        when User
          'u-'
        end
      end
    end
  end
end
