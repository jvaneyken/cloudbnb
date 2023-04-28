# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )
  
    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts "Creating listings..."
    number = 0
    20.times do
      Listing.create!({
        heading: "Test Listing #{number += 1}",
        location: "San Francisco, California, United States",
        price: rand(100..3000),
        num_guests: rand(1..10),
        num_bedrooms: rand(1..5),
        num_beds: rand(1..10),
        num_baths: rand(1..5),
      })
    end
  
    puts "Done!"
  end

  # Listing.all.each_with_index do |listing, index|
  #   listing.photos.attach(
  #     # The string passed to URI.open should be the URL of the image in its bucket.
  #     # This sample assumes the bucket name is `benchbnb-seeds`.
  #     io: URI.open("https://cloudbnb-seeds.s3.us-west-1.amazonaws.com/placeholderImage/deric-0zy0QwHwZy8-unsplash.jpg"), 
  #     filename: "placeholderImage/deric-0zy0QwHwZy8-unsplash.jpg"
  #   )
  # end

  