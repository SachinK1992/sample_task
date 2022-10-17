class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.references :credited_at, index: true, foreign_key: {to_table: :accounts}
      t.references :debited_at, index: true, foreign_key: {to_table: :accounts}
      t.decimal :amount, precision: 10, scale: 2
      t.timestamps
    end
  end
end

# credited_at  |  debited_at  | amount |
