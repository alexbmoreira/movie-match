require 'application_responder'

class ApplicationController < ActionController::API
  self.responder = ApplicationResponder

  include Pundit::Authorization
  include Api::Versioning
  include Sorcery::Controller
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  include SessionFix

  respond_to :json

  before_action :require_login
  after_action :verify_authorized
  before_action :force_json

  def force_json
    request.format = :json
  end
end
