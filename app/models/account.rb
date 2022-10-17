class Account < ApplicationRecord
  belongs_to :user

  # has_many :transactions, -> (object) { joins(:transactions).where("credited_at_id = ? OR debited_at_id = ?", object.id,object.id)}

  has_many :credit, foreign_key: :credited_at_id, class_name: "Transaction"
  has_many :debit, foreign_key: :debited_at_id, class_name: "Transaction"

  validates :number, presence: true, uniqueness: true, length: { is: 12 }

  def transactions
    Transaction.where("credited_at_id = ? OR debited_at_id = ?", id,id)
  end

end
