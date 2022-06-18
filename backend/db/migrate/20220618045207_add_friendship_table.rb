class AddFriendshipTable < ActiveRecord::Migration[7.0]
  def change
    create_table :friendships do |t|
      t.references :user, index: true, foreign_key: {to_table: :users}, null: false
      t.references :friend, index: true, foreign_key: {to_table: :users}, null: false

      t.timestamps null: false
    end

    add_index :friendships, [:user_id, :friend_id], unique: true
  end
end
