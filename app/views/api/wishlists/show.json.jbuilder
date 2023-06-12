json.wishlist do
    json.extract! @wishlist, :id, :listing_id, :user_id
    json.header @wishlist.listing.heading
    json.price @wishlist.listing.price
    json.numBeds @wishlist.listing.num_beds
end