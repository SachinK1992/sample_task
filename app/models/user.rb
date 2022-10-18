class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :accounts, dependent: :destroy

  after_create :create_account

  # private

  def create_account
    acc_number = "PGBNK0#{SecureRandom.hex(3)}"
    while Account.exists?(number: acc_number) do
      acc_number = "PGBNK0#{SecureRandom.hex(3)}"
    end
    accounts.create!(number: acc_number, outstanding_balance: 10_000)
  end
end
