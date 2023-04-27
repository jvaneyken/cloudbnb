class ChangeListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :num_guests, :integer, null: false
    add_column :listings, :num_bedrooms, :integer, null: false
    add_column :listings, :num_beds, :integer, null: false
    add_column :listings, :num_baths, :integer, null: false
  end
end
