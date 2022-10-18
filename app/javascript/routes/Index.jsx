import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home = lazy(() => import('../components/Home'))
const Transactions = lazy(() => import('../components/Transactions'))

export default (
  <>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/accounts/:account_id/transactions" element={<Transactions/>} />
        </Routes>
      </Suspense>
    </Router>
  </>
);
