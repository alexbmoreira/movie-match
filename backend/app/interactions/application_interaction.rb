class ApplicationInteraction < ActiveInteraction::Base
  include Pundit::Authorization
  include CurrentUserContext

  def self.can_run?(*args)
    new(*args)
    true
  rescue Pundit::NotAuthorizedError
    false
  end

  def initialize(args = {})
    super(args.except(:authorize_with))
    authorize!(args[:authorize_with])
  end

  def authorize!(authorize_with)
    policy_klass = "#{self.class.to_s.deconstantize}::InteractionPolicy".constantize
    policy_klass = "#{policy_klass}::#{authorize_with.to_s.classify}".constantize if authorize_with

    authorize(self, "#{self.class.to_s.demodulize.underscore}?".to_sym, policy_class: policy_klass)
  end
end
