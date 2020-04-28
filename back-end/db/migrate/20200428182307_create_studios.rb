class CreateStudios < ActiveRecord::Migration[6.0]
  def change
    create_table :studios do |t|
      t.float :google_score
      t.float :yelp_score
      t.float :overall_score
      t.timestamps
    end
  end
end
