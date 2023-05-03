class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.references :user, null: false, foreign_key: true
      t.date :check_in_date, null: false
      t.date :check_out_date, null: false
      t.integer :num_guests, null: false

      t.timestamps
    end
  end
end
