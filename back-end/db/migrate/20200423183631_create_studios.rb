class CreateStudios < ActiveRecord::Migration[6.0]
  def change
    create_table :studios do |t|
      t.string :name
      t.string :addresss
      t.integer :zipcode
      t.float :longitude
      t.float :latitude
      t.string :image
      t.string :url

      t.timestamps
    end
  end
end
