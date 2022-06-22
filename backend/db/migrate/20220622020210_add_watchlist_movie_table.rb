class AddWatchlistMovieTable < ActiveRecord::Migration[7.0]
  def change
    create_table :watchlist_movies do |t|
      t.references :user, index: true, foreign_key: {to_table: :users}, null: false
      t.integer :movie_id, null: false

      t.timestamps null: false
    end

    add_index :watchlist_movies, [:user_id, :movie_id], unique: true
  end
end
