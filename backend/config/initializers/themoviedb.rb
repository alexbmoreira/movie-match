Tmdb::Api.key(Rails.application.credentials[Rails.env.to_sym][:tmdb_api_key])

module Tmdb
  CONFIGURATION = Tmdb::Configuration.new
  POSTER_SIZE_SM = CONFIGURATION.poster_sizes[1]
  POSTER_SIZE_MD = CONFIGURATION.poster_sizes[4]
  POSTER_SIZE_LG = CONFIGURATION.poster_sizes[6]
  IMAGE_PATH = CONFIGURATION.secure_base_url
end
