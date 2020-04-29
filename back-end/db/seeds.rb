# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: "Adam", age: 29, username: "ADAM101", password_digest: "hellowworld")
Studio.create(name:"SLTNYC",  image_url: "https://www.thegreenwichhotel.com/wp-content/uploads/3848A285-55FE-404D-A8E3-93664F46D905-1.jpg", address: "201 E 67th St 4th floor, New York, NY 10065", longitude: 40.766713, latitude: 73.962486, rating: 3.0, reviews: "too good", price: "10$",url: "https://sltnyc.com/")

User.create(name: "user1", age: 21, username: "user1", password_digest: "password")
User.create(name: "user2", age: 22, username: "user2", password_digest: "password")
User.create(name: "user3", age: 23, username: "user3", password_digest: "password")
User.create(name: "user4", age: 24, username: "user4", password_digest: "password")
puts "Total users created: #{User.count}"
Studio.create(name:"studio1")
Studio.create(name:"studio2")
Studio.create(name:"studio3")
Studio.create(name:"studio4")
puts "Total studios created: #{Studio.count}"
Membership.create(user_id: 1, studio_id: 1)
Membership.create(user_id: 2, studio_id: 2)
Membership.create(user_id: 3, studio_id: 3)
Membership.create(user_id: 4, studio_id: 4)
puts "Total memberships created: #{Studio.count}"
