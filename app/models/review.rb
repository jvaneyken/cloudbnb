class Review < ApplicationRecord

    validates :body, presence: true
    validates :rating, numericality: { in: 1..5 }
    validates :listing_id, uniqueness: { scope: :user_id, message: "already has a review from you"}

    belongs_to :listing
    belongs_to :user, class_name: :User

end
