class AddIsOrderedToOrderDetails < ActiveRecord::Migration
  def change
    add_column :order_details, :is_ordered, :boolean, :default => false
  end
end
