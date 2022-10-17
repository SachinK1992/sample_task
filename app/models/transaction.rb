class Transaction < ApplicationRecord
  belongs_to :credited_at, foreign_key: :credited_at_id, class_name: "Account"
  belongs_to :debited_at, foreign_key: :debited_at_id, class_name: "Account"
end
