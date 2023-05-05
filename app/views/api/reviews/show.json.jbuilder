json.review do
    json.extract! @review, :id, :user_id, :body, :rating, :created_at, :listing_id
    json.userName @review.user.username
end 