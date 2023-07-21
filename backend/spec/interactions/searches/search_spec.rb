require 'rails_helper'

describe Searches::Search do
  wrap_user_context

  let(:params) {
    {
      query: 'spiderman',
      type: type
    }
  }

  subject { described_class.run!(params) }

  context 'when the type is movie' do
    let(:type) { 'movie' }

    it do
      expect_any_instance_of(Searches::Movie).to receive(:run)
      subject
    end
  end

  context 'when the type is person' do
    let(:type) { 'person' }

    it do
      expect_any_instance_of(Searches::Person).to receive(:run)
      subject
    end
  end
end
