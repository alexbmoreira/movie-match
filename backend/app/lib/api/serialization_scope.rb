module Api
  class SerializationScope
    include Pundit::Authorization
    include Api::Versioning

    attr_reader :user,
      :primary_resource_type

    def initialize(options = {})
      @user = options[:user]
      @collection = options[:collection]
      @primary_resource_type = options[:primary_resource_type]
    end

    def collection?
      @collection
    end

    def pundit_user
      user
    end
  end
end
