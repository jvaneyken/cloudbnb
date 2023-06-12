class CreateWishlists < ActiveRecord::Migration[7.0]
  def change
    create_table :wishlists do |t|
      t.references :user, foreign_key: true, null: false
      t.references :listing, foreign_key: true, null: false, index: false

      t.timestamps
    end
    add_index :wishlists, [:listing_id, :user_id], unique: true
  end
end
