class ApplicationResponder < ActionController::Responder
  include Responders::CollectionResponder

  protected

  def api_location
    return options[:location] if options.key?(:location)

    controller.url_for(
      action: :show,
      controller: controller.controller_name,
      id: resource.id
    )
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
