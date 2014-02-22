class CreateTables < ActiveRecord::Migration
  def up
    create_table(:tables) do |t|
      t.string :name
      t.integer :status
      t.timestamps
    end
  end

  def down
    drop_table :tables
  end
end
