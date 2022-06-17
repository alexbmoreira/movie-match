require 'rails_helper'

describe TmdbPerson do
  subject { described_class.new(params) }

  context 'when creating for details page' do
    let(:params) { JSON.parse(File.read('spec/fixtures/tmdb/person_details.json')) }

    it do
      is_expected.to have_attributes(
        id: params['id'],
        name: params['name'],
        biography: params['biography'],
        known_for_department: params['known_for_department'],
        profile_path: params['profile_path'],
        cast_credits: include(a_kind_of(TmdbMovie)),
        crew_credits: include(a_kind_of(TmdbMovie))
      )
    end
  end

  context 'when creating for search results' do
    let(:params) { JSON.parse(File.read('spec/fixtures/tmdb/person_search.json')) }

    it do
      is_expected.to have_attributes(
        id: params['id'],
        name: params['name'],
        known_for_department: params['known_for_department'],
        profile_path: params['profile_path'],
        known_for: include(a_kind_of(TmdbMovie))
      )
    end
  end
end
