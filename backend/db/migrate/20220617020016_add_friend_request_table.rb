class AddFriendRequestTable < ActiveRecord::Migration[7.0]
  def change
    create_table :friend_requests do |t|
      t.references :creator, index: true, foreign_key: {to_table: :users}
      t.references :receiver, index: true, foreign_key: {to_table: :users}

      t.timestamps null: false
    end

    add_index :friend_requests, [:creator_id, :receiver_id], unique: true
  end
end
