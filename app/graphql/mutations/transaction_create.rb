module Mutations
  class TransactionCreate < Mutations::BaseMutation
    null true

    argument :source_account_id, ID, required: true
    argument :destination_account_id, ID, required: true
    argument :amount, Float, required: true

    field :transaction, Types::TransactionType
    field :errors, [String]

    def resolve(source_account_id:, destination_account_id:, amount:)
      user = context[:current_user]

      source_account = user.accounts.find(source_account_id)
      destination_account = Account.where.not(id: source_account_id).find(destination_account_id)
      transaction = source_account.debit.build(credited_at: destination_account, amount: amount)
      if transaction.save
        {
          transaction: transaction,
          errors: []
        }
      else
        {
          transaction: nil,
          errors: transaction.errors.full_messages
        }
      end
    end
  end
end
