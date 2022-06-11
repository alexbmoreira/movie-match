class ApplicationSerializer < ActiveModel::Serializer
  include Pundit::Authorization
  include Api::Versioning
end
