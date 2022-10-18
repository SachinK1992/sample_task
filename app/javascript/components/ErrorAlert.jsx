import React from "react";
import { Alert } from "react-bootstrap";

export default ({error}) => {
  return (
    <>
      {error && <Alert variant='danger'>{error}</Alert>}
    </>
  )
}
