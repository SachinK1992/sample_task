# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


users = ["Tony Stark", "Bruce Banner", "Steve Rogers", "Kooper", "Peter Parker"]

users.each_with_index do |name, index|
  email = "#{name.downcase.gsub(' ', '.')}@fakermail.com"
  user = User.create(name: name, email: email, password: "password")

  if user
    puts "--------Create account--------------#{user.id}"
    remain_char = 12 - "PGBNK00#{index}".length
    Account.create!(user_id: user.id, number: "#{'0'*remain_char}PGBNK00#{index}", outstanding_balance: 10000)
  end
end

Account.all.each do |account|
  [10, 12, 15].sample.times do
    other_account = Account.where.not(id: account.id).sample
    amount = [100, 200, 500, 1000].sample
    # account will randomly credit/debit amount inot another account
    # :credited_at_id => :integer,
    # :debited_at_id => :integer,
    # :amount => :decimal,

    puts "Credited #{amount} from #{account.number} to #{other_account.number} acount"
    Transaction.create(credited_at_id: other_account.id, debited_at_id: account.id, amount: amount)
  end

end
