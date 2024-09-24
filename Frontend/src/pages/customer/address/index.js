import React, { Fragment } from "react";
import Head from "next/head";
import Address from "@/components/Customer/CustomerUpdate/Address";

function AddressPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar la direccion del Cliente</title>
        <meta name="description" content="Edit your client's address" />
      </Head>
      <Address></Address>
    </Fragment>
  );
}

export default AddressPage;
