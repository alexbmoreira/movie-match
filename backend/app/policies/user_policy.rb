class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      User.all
    end
  end
end
