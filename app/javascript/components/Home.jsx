import { useQuery } from "@apollo/client";
import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { GET_ACCOUNTS } from "../graphql/queries";
import ErrorAlert from "./ErrorAlert";

export default () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);

  return (
    <Container className="text-center mt-5">
      {loading && <div>Loading...</div>}
      <ErrorAlert error={error?.message}/>
      {data &&
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Account Number</th>
              <th>Balance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.accounts.map((account, index) => (
              <tr key={`account-row-${index}`}>
                <td>{index+1}</td>
                <td>{account.number}</td>
                <td>${account.outstandingBalance}</td>
                <td><Button href={`/accounts/${account.id}/transactions`}>View Transactions</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
    </Container>
  )
}
