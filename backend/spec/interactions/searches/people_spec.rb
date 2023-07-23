require 'rails_helper'

describe Searches::People do
  wrap_user_context

  let(:params) {
    {
      query: 'spiderman'
    }
  }

  before do
    allow_any_instance_of(described_class).to receive(:tmdb_fetch).and_return([])
  end

  subject { described_class.run!(params) }

  it do
    expect_any_instance_of(described_class).to receive(:tmdb_fetch)
    subject
  end
end
