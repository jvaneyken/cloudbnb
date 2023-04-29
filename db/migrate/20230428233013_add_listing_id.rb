class AddListingId < ActiveRecord::Migration[7.0]
  def change
    add_column :reservations, :listing_id, :bigint, null: false
    add_foreign_key :reservations, :listings, column: :listing_id
  end
end
