class CreateAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :accounts do |t|
      # considering account number will be an Alpha-Numeric value
      t.string :number, null: false
      t.boolean :active, default: true
      t.references :user, null: false, foreign_key: true
      t.decimal :outstanding_balance, precision: 10, scale: 2
      t.timestamps
    end
  end
end
