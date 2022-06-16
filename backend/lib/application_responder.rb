class ApplicationResponder < ActionController::Responder
  include Responders::CollectionResponder

  protected

  def api_location
    return options[:location] if options.key?(:location)

    controller.url_for(
      action: :show,
      controller: controller.controller_name,
      id: unwrapped_resource.id
    )
  end

  def unwrapped_resource
    resource.kind_of?(ActiveInteraction::Base) ? resource.result : resource
  end

  def display(resource, given_options = {})
    resource_to_render = resource.kind_of?(ActiveInteraction::Base) ? resource.result : resource
    scope = {
      collection: resource_to_render.respond_to?(:each),
      primary_resource_type: resource_to_render.try(:model) || resource_to_render.class
    }
    given_options = {
      adapter: :json_api,
      key_transform: :camel_lower,
      scope: scope
    }.merge!(given_options)

    super(resource_to_render, given_options)
  end

  def has_view_rendering? # rubocop:disable PredicateName
    false
  end

  def api_behavior
    raise MissingRenderer, format unless has_renderer?

    if get?
      display resource
    elsif post?
      display resource, status: :created, location: api_location
    elsif put? || patch?
      display resource, status: :ok
    else
      head :no_content
    end
  end
end
