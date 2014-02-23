class AddDateToOrderDetails < ActiveRecord::Migration
  def change
    add_column :order_details, :date, :string
  end
end
