class AddMatchlistActionTable < ActiveRecord::Migration[7.0]
  def change
    create_table :matchlist_actions do |t|
      t.references :user, index: true, foreign_key: {to_table: :users}, null: false
      t.references :friend, index: true, foreign_key: {to_table: :users}, null: false
      t.integer :movie_id, null: false
      t.string :type, null: false

      t.timestamps null: false
    end

    add_index :matchlist_actions, [:user_id, :friend_id, :movie_id], unique: true
  end
end
