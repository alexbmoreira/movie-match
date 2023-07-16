class AddPasswordDigestToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :password_digest, :string
    remove_column :users, :crypted_password
    remove_column :users, :salt
    remove_column :users, :reset_password_token
    remove_column :users, :reset_password_token_expires_at
    remove_column :users, :reset_password_email_sent_at
    remove_column :users, :access_count_to_reset_password_page
    remove_column :users, :last_login_at
    remove_column :users, :last_logout_at
    remove_column :users, :last_activity_at
    remove_column :users, :last_login_from_ip_address
  end
end
