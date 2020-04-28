class AddUserToMemberships < ActiveRecord::Migration[6.0]
  def change
    add_reference :memberships, :user, null: false, foreign_key: true
  end
end
