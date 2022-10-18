import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { TRANSACTION_CREATE } from "../graphql/mutations";
import { GET_ALL_ACCOUNTS, GET_TRANSACTIONS } from "../graphql/queries";
import ErrorAlert from "./ErrorAlert";

export default ({show, handleClose}) => {
  const { account_id } = useParams()
  const [sourceAccount, setSourceAccount] = useState(account_id)
  const [destinationAccount, setDestinationAccount] = useState('')
  const [amount, setamount] = useState('')
  const [ loadAccounts, { called, loading, data } ] = useLazyQuery(GET_ALL_ACCOUNTS);
  const [transactionCreate, { loading: transactionLoading, error, data: transactionData }] = useMutation(TRANSACTION_CREATE, {
    refetchQueries: [{query: GET_TRANSACTIONS, variables: {accountId: sourceAccount}}],
  });

  useEffect(() => {
    if(show){
      loadAccounts()
    }
  }, [show])

  useEffect(() => {
    if(transactionData?.transactionCreate?.transaction){
      handleClose()
    }
  }, [transactionData])

  const handleSourceAccountChange = (e) => {
    setSourceAccount(e.target.value)
  }

  const handleDestinationAccountChange = (e) => {
    setDestinationAccount(e.target.value)
  }

  const handleAmountChange = (e) => {
    setamount(e.target.value)
  }

  const sendAmount = (e) => {
    e.preventDefault()
    if(sendButtonDisabled) return
    transactionCreate({
      variables: {
        sourceAccountId: sourceAccount,
        destinationAccountId: destinationAccount,
        amount: parseFloat(amount)
      }
    })
  }

  const sendButtonDisabled = (transactionLoading || !amount || !destinationAccount || !sourceAccount)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Send Money To an Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ErrorAlert error={error?.message || (transactionData?.transactionCreate?.errors && transactionData.transactionCreate.errors[0])}/>
        <Form onSubmit={sendAmount}>
          {called && loading && <div>Loading...</div>}
          {data && <>
            <Form.Group className="mb-3" >
              <Form.Label>Source Account</Form.Label>
                <Form.Select defaultValue={sourceAccount} onChange={handleSourceAccountChange}>
                  {data.accounts.map((account, index) => (
                    <option key={`source-account-${index}`} value={account.id}>{account.number}</option>
                  ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Destination Account</Form.Label>
                <Form.Select defaultValue={destinationAccount} onChange={handleDestinationAccountChange}>
                  <option value=''>Select an Account</option>
                  {data.allAccounts.filter((account) => (account.id != sourceAccount)).map((account, index) => (
                    <option key={`destination-account-${index}`} value={account.id}>{`${account.number}(${account.user.email})`}</option>
                  ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Amount to Send</Form.Label>
              <Form.Control type="number" placeholder="Enter Amount" min={0} value={amount} onChange={handleAmountChange} />
            </Form.Group>
          </>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={sendAmount} disabled={sendButtonDisabled}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
