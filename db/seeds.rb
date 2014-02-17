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

for i in 1..5 do
  user = User.find_by_username("employee#{i}")
  if !user
    user = User.new(username: "employee#{i}", password: "12345678", password_confirmation: "12345678")
    user.save
  end
  user.add_role :employee
end