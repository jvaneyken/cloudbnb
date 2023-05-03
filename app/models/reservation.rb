class Reservation < ApplicationRecord

    validates :user_id, :check_in_date, :check_out_date, :num_guests, presence: true
    validates :num_guests, numericality: { in: 1..10, message: "There must be between 1 and 5 guests" }

    belongs_to :user

    belongs_to :listing

end
