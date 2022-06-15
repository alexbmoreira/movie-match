require 'application_responder'
require 'user_context'

class ApplicationController < ActionController::API
  self.responder = ApplicationResponder

  include Pundit::Authorization
  include Api::Versioning
  include Sorcery::Controller
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  include SessionFix

  respond_to :json

  before_action :require_login, except: [:not_found]
  after_action :verify_authorized, except: [:not_found]
  around_action :set_current_user
  before_action :force_json

  def force_json
    request.format = :json
  end

  def not_found
    render plain: 'Not found.', status: :not_found
  end

  def set_current_user(&block) # rubocop:disable Naming/AccessorMethodName
    UserContext.with_context(
      current_user, {}, &block
    )
  end
end
