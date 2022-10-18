import gql from 'graphql-tag';

export const TRANSACTION_CREATE = gql`
  mutation createTransaction($sourceAccountId: ID!, $destinationAccountId: ID!, $amount: Float!) {
    transactionCreate(input: { sourceAccountId: $sourceAccountId, destinationAccountId: $destinationAccountId, amount: $amount }){
      transaction {
        id
      }
      errors
    }
  }
`
