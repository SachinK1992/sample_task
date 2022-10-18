module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :accounts, [Types::AccountType],
      description: "List of all the accounts for current user"
    def accounts
      context[:current_user].accounts
    end

    field :all_accounts, [Types::AllAccountType],
      description: "List of all the accounts"
    def all_accounts
      Account.all.includes(:user)
    end

    field :account, Types::AccountType,
      description: "List of all the accounts for current user" do
        argument :account_id, ID, required: true
    end
    def account(account_id:)
      context[:current_user].accounts.find(account_id)
    end

    field :transactions, [Types::TransactionType],
      description: "List of all transactions for an account" do
        argument :account_id, ID, required: true
    end
    def transactions(account_id:)
      context[:current_user].accounts.find(account_id).transactions.order(created_at: :desc).includes(credited_at: [:user], debited_at: [:user])
    end
  end
end
