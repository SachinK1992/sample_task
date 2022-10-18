# frozen_string_literal: true

module Types
  class AccountType < Types::BaseObject
    field :id, ID, null: false
    field :number, String, null: false
    field :user, Types::UserType, null: false
    field :outstanding_balance, Float
  end
end
