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

    puts "Destroying listings..."
    Listing.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')

    ApplicationRecord.connection.reset_pk_sequence!('listings')


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

    headings = { 
      1 =>  "754A - Peaceful Convenient 2B1B in Excelsior",
      2 => "Peaceful garden space in nice neighborhood in SF",
      3 => "Amazing 2 BR Mission Terrace Home",
      4 => "Balcony & Bay views, Self check in, easy parking",
      5 => "Private Garden suite in charming SF neighborhood",
      6 => "Cozy Two Small Bedroom Units",
      7 => "Views of the Bay in SF (6)",
      8 => "Oceanfront Boho Retreat - Pacific Sunset Views",
      9 => "2br Victorian House with Breathtaking views",
      10 => "Tranquil, Stylish Studio Combining Indoor with",
      11 => "Bali Hai Castro Retreat & Hot Tub",
      12 => "Luxury High-Rise Downtown SF",
      13 => "Lux 2 bed 2bath downtown SF",
      14 => "San Francisco Jewel",
      15 => "Private Modern Retreat - Patio, Fire Pit, Hot Tub+",
      16 => "Top Area/Lux Suite/Garden nr Fillmore & Union Sts.",
      17 => "Top Floor 2-bed 2bath spot in SoMa",
      18 => "Fabulous Studio in the Castro District",
      19 => "Spacious 1 bedroom condo w/ roofdeck in Nob Hill",
      20 => "Meticulous Mid-Century Modern Manse"
  }


    puts "Creating listings..."
    number = 0
    20.times do
      Listing.create!({
        heading: "#{headings[number += 1]}",
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

Listing.all.each_with_index do |listing, listing_i|
  (1..5).each do |photo_i|
    listing.photos.attach(
      # The string passed to URI.open should be the URL of the image in its bucket.
      # This sample assumes the bucket name is `benchbnb-seeds`.
      io: URI.open("https://cloudbnb-seeds.s3.us-west-1.amazonaws.com/listings/listing_#{listing_i + 1}/listing_img_#{photo_i}.jpeg"), 
      filename: "listings/listing_#{listing_i + 1}/listing_img_#{photo_i}.jpeg"
    )
  end
end

  