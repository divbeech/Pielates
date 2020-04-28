class CreateStudios < ActiveRecord::Migration[6.0]
  def change
    create_table :studios do |t|
      t.string :name
      t.string :image_url
      t.string :address
      t.float :longitude
      t.float :latitude
      t.float :rating
      t.integer :reviews
      t.string :price
      t.string :url
      t.timestamps
    end
  end
end
