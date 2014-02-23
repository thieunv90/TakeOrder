# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
admin = User.find_by_username("admin")
if !admin
  admin = User.new(username: "admin", password: "12345678", password_confirmation: "12345678")
  admin.save
end
admin.add_role :admin
admin.save

# Create Employee
for i in 1..5 do
  user = User.find_by_username("employee#{i}")
  if !user
    user = User.new(username: "employee#{i}", password: "12345678", password_confirmation: "12345678")
    user.save
  end
  user.add_role :employee
end

# Create Chef
for j in 1..5 do
  chef = User.find_by_username("chef#{j}")
  if !chef
    chef = User.new(username: "chef#{j}", password: "12345678", password_confirmation: "12345678")
    chef.save
  end
  chef.add_role :chef
end

# Create Table
for m in 1..10 do
  table = Table.find_by_name("Table #{m}")
  if !table
    table = Table.new(name: "Table #{m}", status: 1)
    table.save
  end
end

# Create Food
for n in 1..5 do
  food = Food.find_by_name("Food #{n}")
  if !food
    food = Food.new(name: "Food #{n}", price: Random.rand(50000))
    food.save
  end
end