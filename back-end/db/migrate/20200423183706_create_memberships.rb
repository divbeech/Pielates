class CreateMemberships < ActiveRecord::Migration[6.0]
  def change
    create_table :memberships do |t|
      t.references :user, null: false, foreign_key: true
      t.references :studio, null: false, foreign_key: true
      t.boolean :favorite

      t.timestamps
    end
  end
end
