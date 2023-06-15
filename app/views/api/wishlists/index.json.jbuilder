# json.wishlists do
    @wishlists.each do |wishlist|
        json.set! wishlist.id do
            json.extract! wishlist, :id, :listing_id, :user_id
            json.header wishlist.listing.heading
            json.price wishlist.listing.price
            json.numBeds wishlist.listing.num_beds

            json.photoUrls wishlist.listing.photos.map {|url| url.url}
        end
    end
# end