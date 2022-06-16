module ContextHelpers
  module UserContextHelper
    def wrap_user_context(&block)
      around(:example) { |example|
        user = !!block ? instance_eval(&block) : create(:user)
        raise ArgumentError, 'block must return a user' unless user.kind_of?(User)

        UserContext.with_user(user, &example)
      }
    end
  end
end
