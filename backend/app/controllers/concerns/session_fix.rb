module SessionFix
  extend ActiveSupport::Concern

  class FakeSession < Hash
    def enabled?
      false
    end
  end

  included do
    before_action :set_fake_rack_session

    private

    def set_fake_rack_session
      request.env['rack.session'] ||= FakeSession.new
    end
  end
end
