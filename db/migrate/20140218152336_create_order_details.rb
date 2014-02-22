class CreateOrderDetails < ActiveRecord::Migration
  def up
    create_table(:order_details) do |t|
      t.integer :food_id
      t.integer :quantity
      t.integer :table_id
      t.integer :user_id
      t.timestamps
    end
  end

  def down
    drop_table :order_details
  end
end
