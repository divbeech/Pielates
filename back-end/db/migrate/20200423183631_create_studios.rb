class CreateStudios < ActiveRecord::Migration[6.0]
  def change
    create_table :studios do |t|
      t.string :name
      t.string :addresss
      t.integer :zipcode
      t.string :longitude
      t.string :latitude
      t.string :image
      t.string :url

      t.timestamps
    end
  end
end
