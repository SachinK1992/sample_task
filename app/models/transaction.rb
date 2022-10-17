class Transaction < ApplicationRecord
  belongs_to :credited_at, foreign_key: :credited_at_id, class_name: "Account"
  belongs_to :debited_at, foreign_key: :debited_at_id, class_name: "Account"

  # validation if account holder has insufficient balance
  validate :check_balance
  after_create :debit_balance_from_account
  after_create :credit_balance_into_account

  # A transaction can not updated or deleted
  before_update :prevent_update
  before_destroy :prevent_update

  private
  def check_balance
    if amount.to_f > debited_at.outstanding_balance.to_f
      errors.add(:amount, "You have insufficient balance.")
    end
  end

  def debit_balance_from_account
    debit_amount = debited_at.outstanding_balance - amount
    debited_at.update(outstanding_balance: debit_amount)
  end

  def credit_balance_into_account
    credit_amount = credited_at.outstanding_balance + amount
    credited_at.update(outstanding_balance: credit_amount)
  end

  # A transaction can not updated or deleted
  def prevent_update
    errors.add(:base, "Transaction can not be deleted or updated")
    throw :abort
  end

end
