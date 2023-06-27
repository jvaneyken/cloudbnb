class Reservation < ApplicationRecord
    validates :user_id, :check_in_date, :check_out_date, :num_guests, presence: true
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
  
  
