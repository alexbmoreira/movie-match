require 'rails_helper'

describe Search::Search do
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
      expect_any_instance_of(Search::Movie).to receive(:run)
      subject
    end
  end
end
