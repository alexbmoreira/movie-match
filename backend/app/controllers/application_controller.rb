class ApplicationController < ActionController::API
  self.responder = ApplicationResponder

  include Pundit::Authorization
  include Api::Versioning
  include Sorcery::Controller
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  respond_to :json

  before_action :require_login, except: [:not_found, :not_authorized]
  after_action :verify_authorized, except: [:not_found, :not_authorized]
  around_action :set_current_user
  before_action :force_json

  rescue_from Pundit::NotAuthorizedError, with: :not_authorized

  def not_authorized
    head(:forbidden)
  end

  def not_found
    head(:not_found)
  end

  def force_json
    request.format = :json
  end

  def set_current_user(&block) # rubocop:disable Naming/AccessorMethodName
    UserContext.with_context(
      current_user, {}, &block
    )
  end
end
