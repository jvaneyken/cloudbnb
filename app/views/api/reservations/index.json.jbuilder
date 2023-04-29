json.reservations do
    @reservations.each do |reservation|
        json.set! reservation.id do
            json.extract! reservation, :id, :user_id, :check_in_date, :check_out_date, :num_guests, :listing_id
        end
    end
end