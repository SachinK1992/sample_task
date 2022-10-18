# frozen_string_literal: true

module Types
  class TransactionType < Types::BaseObject
    field :id, ID, null: false
    field :credited_at, Types::AccountType
    field :debited_at, Types::AccountType
    field :amount, Float
    field :created_at, String

    def created_at
      object.created_at.strftime('%d/%m/%y %H:%M')
    end
  end
end
