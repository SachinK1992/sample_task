module Types
  class MutationType < Types::BaseObject
    field :transaction_create, mutation: Mutations::TransactionCreate
  end
end
