class CreateMemberships < ActiveRecord::Migration[6.0]
  def change
    create_table :memberships do |t|
      t.string :name
      t.string :yelp_id
      t.string :image
      t.string :address
      t.string :phone

      t.timestamps
    end
  end
end
