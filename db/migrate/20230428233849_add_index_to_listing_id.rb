class AddIndexToListingId < ActiveRecord::Migration[7.0]
  def change
    add_index :reservations, :listing_id
  end
end
