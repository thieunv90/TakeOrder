class Table < ActiveRecord::Base
  has_many :order_details
  attr_accessible :name, :status
end
