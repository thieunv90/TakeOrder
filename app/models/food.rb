class Food < ActiveRecord::Base
  attr_accessible :name, :price
  has_many :order_details
end
