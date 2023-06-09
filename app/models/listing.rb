class Listing < ApplicationRecord

    validates :heading, :location, :price, presence: true
    validates :price, numericality: { in: 100..3000, message: "Price must be between 100 and 3000" }
    validates :num_guests, numericality: { in: 1..10, message: "There must be between 1 and 5 guests" }
    validates :num_bedrooms, numericality: { in: 1..5, message: "There must be between 1 and 5 bedrooms" }
    validates :num_beds, numericality: { in: 1..10, message: "There must be between 1 and 5 beds" }
    validates :num_baths, numericality: { in: 1..5, message: "There must be between 1 and 5 baths" }

    has_many_attached :photos

    has_many :reservations
    has_many :reviews,
     dependent: :destroy

    has_many :wishlists,
        foreign_key: :listing_id,
        dependent: :destroy

end
