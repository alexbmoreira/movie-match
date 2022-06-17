class InteractionAuthContext
  def self.with_context
    old_context = current
    self.current = new
    yield current
  ensure
    self.current = old_context
  end

  def self.current
    RequestStore[:current_interaction_auth_context]
  end

  private_class_method def self.current=(context)
    RequestStore[:current_interaction_auth_context] = context
  end

  def self.authorize
    current&.authorize
  end

  def was_authorized?
    !!@_was_authorized
  end

  def authorize
    @_was_authorized = true
  end
end
