json.reservation do
    json.extract! @reservation, :id, :user_id, :check_in_date, :check_out_date, :num_guests, :listing_id
end