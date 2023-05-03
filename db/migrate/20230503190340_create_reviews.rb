class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.text :body, null: false
      t.integer :rating, null: false
      t.references :user, foreign_key: true, null: false
      t.references :listing, foreign_key: true, null: false, index: false


      t.timestamps
    end
    add_index :reviews, [:listing_id, :user_id], unique: true
  end
end
