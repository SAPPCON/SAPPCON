import React, { Fragment } from "react";
import Head from "next/head";
import Address from "@/components/Building/BuildingUpdate/Address";

function AddressPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Dirección de la Obra</title>
        <meta name="description" content="Edit your building's address" />
      </Head>
      <Address></Address>
    </Fragment>
  );
}

export default AddressPage;
