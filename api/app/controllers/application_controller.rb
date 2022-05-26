class ApplicationController < ActionController::API
  include Pundit

  def newThing
  end

  after_action :verify_authorized
  after_action :verify_policy_scoped, only: :index
end
