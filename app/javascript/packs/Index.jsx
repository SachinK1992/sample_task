import React from "react";
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "../components/App";
import createApolloClient from "../utils/createApolloClient";
import { ApolloProvider } from "@apollo/client";

document.addEventListener("DOMContentLoaded", () => {
  const client = createApolloClient();

  document.addEventListener('turbolinks:load', () => {
    const root = createRoot(document.body.appendChild(document.createElement("div")));
    root.render(
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    );
  })
});
