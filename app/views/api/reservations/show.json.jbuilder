json.reservation do
    json.extract! @reservation, :id, :user_id, :check_in_date, :check_out_date, :num_guests, :listing_id
    json.header @reservation.listing.heading
end
# json.listing do
#     json.extract! @reservation.listing, :id, :heading, :location, :price, :num_guests, :num_bedrooms, :num_beds, :num_baths
#     json.photoUrls @reservation.listing.photos[0]
# end