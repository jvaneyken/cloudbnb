class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.string :heading, null: false
      t.string :location, null: false
      t.integer :price, null: false
      t.timestamps
    end
    add_index :listings, :heading, unique: true
  end
end
