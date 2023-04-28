json.listing do
    json.extract! @listing, :id, :heading, :location, :price, :num_guests, :num_bedrooms, :num_beds, :num_baths
    json.photoUrls @listing.photos.map {|url| url_for(url)}
end