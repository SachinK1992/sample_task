# frozen_string_literal: true

module Types
  class AllAccountType < Types::BaseObject
    field :id, ID, null: false
    field :number, String, null: false
    field :user, Types::UserType, null: false
  end
end
