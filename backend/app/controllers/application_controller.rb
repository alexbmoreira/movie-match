class ApplicationController < ActionController::API
  self.responder = ApplicationResponder

  include Pundit::Authorization
  include ActionController::Cookies
  include Api::Versioning

  respond_to :json

  before_action :authorize
  before_action :force_json
  around_action :enforce_pundit
  around_action :set_current_user

  def force_json
    request.format = :json
  end

  def encode_token(payload)
    JWT.encode(payload, Rails.application.credentials[Rails.env.to_sym][:secret_key_base])
  end

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    return unless request.headers['Authorization']

    begin
      JWT.decode(
        request.headers['Authorization'].split(' ').last,
        Rails.application.credentials[Rails.env.to_sym][:secret_key_base],
        true,
        algorithm: 'HS256'
      )
    rescue JWT::DecodeError
      nil
    end
  end

  def logged_in_user
    return unless decoded_token

    user_id = decoded_token[0]['user_id']
    @user = User.find_by(id: user_id)
  end

  def logged_in?
    !!logged_in_user
  end

  def authorize
    render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
  end

  def set_current_user(&block) # rubocop:disable Naming/AccessorMethodName
    UserContext.with_context(
      @user, {}, &block
    )
  end

  def current_user
    @user
  end

  def enforce_pundit
    InteractionAuthContext.with_context do |context|
      yield

      skip_authorization if context.was_authorized?
      skip_policy_scope if context.was_policy_scoped?
    end
  end
end
