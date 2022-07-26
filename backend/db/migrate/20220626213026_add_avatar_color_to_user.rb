class AddAvatarColorToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :avatar_color, :integer, default: 0, null: false
  end
end
