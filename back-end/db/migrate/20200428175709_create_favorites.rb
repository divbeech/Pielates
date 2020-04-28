class CreateFavorites < ActiveRecord::Migration[6.0]
  def change
    create_table :favorites do |t|
      t.boolean :prefers_google
      

    

      t.timestamps
    end
  end
end
