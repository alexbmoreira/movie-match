class ApplicationController < ActionController::API
  self.responder = ApplicationResponder
  include ActionController::Cookies
  include Api::Versioning

  respond_to :json

  before_action :authorize
  before_action :force_json

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
    return unless cookies.signed[:jwt]

    begin
      JWT.decode(
        cookies.signed[:jwt],
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
end
