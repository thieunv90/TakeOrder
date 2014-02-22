class OrderDetail < ActiveRecord::Base
  attr_accessible :food_id, :quantity, :total_cost, :table_id, :user_id
  belongs_to :table
  belongs_to :user
  belongs_to :food
end
