class CreateFoods < ActiveRecord::Migration
  def up
    create_table(:foods) do |t|
      t.string :name
      t.integer :price
      t.timestamps
    end
  end

  def down
    drop_table :foods
  end
end
