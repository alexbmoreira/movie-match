class UserContext
  attr_reader :user, :admin_user, :options, :true_user

  def initialize(user, options)
    @user = user
    @options = options || {}
  end

  delegate :[], to: :options

  def self.with_context(user, options = nil)
    old_context = current_context
    self.current_context = new(user, options)
    yield
  ensure
    self.current_context = old_context
  end

  def self.with_user(user, &block)
    with_context(user, &block)
  end

  def self.current_context
    Thread.current[:user_context]
  end

  def self.current_user
    current_context&.user
  end

  def self.current_context=(context)
    Thread.current[:user_context] = context
  end
end
