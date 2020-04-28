class AddStudioToMemberships < ActiveRecord::Migration[6.0]
  def change
    add_reference :memberships, :studio, null: false, foreign_key: true
  end
end
