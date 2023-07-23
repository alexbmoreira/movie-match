require 'rails_helper'

describe Searches::Movies do
  wrap_user_context

  let(:params) {
    {
      query: 'spider-man'
    }
  }

  before do
    allow_any_instance_of(described_class).to receive(:tmdb_fetch).and_return([])
  end

  subject { described_class.run!(params) }

  it do
    expect_any_instance_of(described_class).to receive(:tmdb_fetch).and_return([])
    subject
  end
end
