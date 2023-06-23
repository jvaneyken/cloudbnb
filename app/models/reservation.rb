class Reservation < ApplicationRecord
    validates :user_id, :check_in_date, :check_out_date, :num_guests, presence: true
    validates :num_guests, numericality: { in: 1..10, message: "There must be between 1 and 10 guests" }
    validate :check_out_date_after_check_in_date
  
    belongs_to :user
    belongs_to :listing
  
    private
  
    def check_out_date_after_check_in_date
      return unless check_in_date && check_out_date
  
      if check_out_date <= check_in_date
        errors.add(:check_out_date, "must be after the check-in date")
      end
    end
end
  
  
