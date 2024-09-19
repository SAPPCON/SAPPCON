import React, { Fragment } from "react";
import Head from "next/head";
import Customer from "@/components/Customer/Customer";

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
      <Customer />
    </Fragment>
  );
}

export default CustomerPage;
