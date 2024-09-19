import React, { Fragment } from "react";
import Head from "next/head";
import Address from "@/components/Profile/ProfileUpdate/Address";

function AddressPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Dirección</title>
        <meta name="description" content="Edit your address" />
      </Head>
      <Address></Address>
    </Fragment>
  );
}

export default AddressPage;
