class AddTotalCostToOrderDetails < ActiveRecord::Migration
  def change
    add_column :order_details, :total_cost, :integer
  end
end
