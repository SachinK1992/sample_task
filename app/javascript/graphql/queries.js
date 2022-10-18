import gql from 'graphql-tag';

export const GET_ACCOUNTS = gql`
  query AccountsPage {
    accounts {
      id
      number
      outstandingBalance
    }
  }
`
export const GET_ALL_ACCOUNTS = gql`
  query AllAccounts {
    accounts {
      id
      number
    }

    allAccounts {
      id
      number
      user {
        email
      }
    }
  }
`

export const GET_TRANSACTIONS = gql`
  query Transactions($accountId: ID!) {
    account(accountId: $accountId) {
      id
      number
      outstandingBalance
    }

    transactions(accountId: $accountId) {
      id
      amount
      createdAt
      debitedAt {
        id
        user{
          email
        }
      }
      creditedAt {
        id
        user{
          email
        }
      }
    }
  }
`
