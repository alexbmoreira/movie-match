module VerifyScoped
  extend ActiveSupport::Concern

  included do
    set_callback :execute, :around, ->(_interaction, block) {
      result = block.call
      verify_policy_scoped if result.kind_of? ActiveRecord::Relation
    }
  end
end
