require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    # Use the responders controller from the responders gem
    config.app_generators.scaffold_controller :responders_controller

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore, key: '_namespace_key'

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    config.eager_load_paths += Dir[Rails.root.join('lib', '**/')]

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    ActiveValidators.activate(:email)
    
    config.middleware.use OliveBranch::Middleware, inflection: 'camel'

    Rails.application.routes.default_url_options[:protocol] = Rails.application.credentials[Rails.env.to_sym][:protocol]
    Rails.application.routes.default_url_options[:host] = Rails.application.credentials[Rails.env.to_sym][:domain]
  end
end
