import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { GET_TRANSACTIONS } from "../graphql/queries";
import ErrorAlert from "./ErrorAlert";
import TransactionModal from "./TransactionModal";

export default () => {
  const { account_id } = useParams()
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, { variables: { accountId: account_id }});
  const [showTransactionModal, setShowTransactionModal] = useState(false)

  const isDebit = (transaction) => (transaction.debitedAt.id === account_id)

  const getTransactionAmount = (transaction) => {
    if(isDebit(transaction)){
      return `-$${transaction.amount}`
    }
    return `$${transaction.amount}`
  }

  const getTransactionCrOrDr = (transaction) => {
    if(isDebit(transaction)){
      return 'Debit'
    }
    return 'Credit'
  }

  const getTransactionDescription = (transaction) => {
    if(isDebit(transaction)){
      return `To ${transaction.creditedAt.user.email}`
    }
    return `From ${transaction.debitedAt.user.email}`
  }

  return (
    <Container className="text-center mt-5">
      <TransactionModal show={showTransactionModal} handleClose={() => setShowTransactionModal(false)}/>
      <div className="justify-content-between d-flex mb-2">
        <Button href="/">Back to Accounts</Button>
        <Button onClick={() => setShowTransactionModal(true)}>Send Money to a Acount</Button>
      </div>
      {loading && <div>Loading...</div>}
      <ErrorAlert error={error?.message}/>
      {data && <>
        <Card>
          <Card.Body className="d-flex justify-content-between">
            <div><b>Account Number:</b> {data.account.number}</div>
            <div><b>Balance:</b> ${data.account.outstandingBalance}</div>
          </Card.Body>
        </Card>
        <Card body className="border-0"><b>Transactions</b></Card>
        <Table striped className="text-start">
          <thead>
            <tr>
              <th>#</th>
              <th>Date Time</th>
              <th>To/From Account</th>
              <th>Cr/Dr</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.transactions.map((transaction, index) => (
              <tr key={`transaction-row-${index}`}>
                <td>{index+1}</td>
                <td>{transaction.createdAt}</td>
                <td>{getTransactionDescription(transaction)}</td>
                <td>{getTransactionCrOrDr(transaction)}</td>
                <td>{getTransactionAmount(transaction)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {data.transactions.length === 0 && <div className="text-center fw-bold">No Transactions yet.</div> }
      </>}
    </Container>
  )
}
