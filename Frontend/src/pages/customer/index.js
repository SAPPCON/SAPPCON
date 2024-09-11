import React, { Fragment } from "react";
import Head from "next/head";
import CustomerNav from "@/components/Navigation/CustomerNav";

function CustomerPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Clientes</title>
        <meta
          name="description"
          content="List of all the customers you have. Add, modify, delete as needed."
        />
      </Head>
      <CustomerNav />
    </Fragment>
  );
}

export default CustomerPage;
