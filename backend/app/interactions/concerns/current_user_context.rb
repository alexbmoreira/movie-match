module CurrentUserContext
  extend ActiveSupport::Concern

  def current_user
    UserContext.current_user
  end

  def current_admin_user
    UserContext.current_admin_user
  end
end
