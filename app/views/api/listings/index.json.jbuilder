json.listings do
    @listings.each do |listing|
        json.set! listing.id do
            json.extract! listing, :id, :heading, :location, :price, :num_guests, :num_bedrooms, :num_beds, :num_baths
        end
    end
end