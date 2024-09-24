import React, { Fragment } from "react";
import Head from "next/head";
import Lastname from "@/components/Customer/CustomerUpdate/Lastname";

function LastnamePage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Apellido del Cliente</title>
        <meta name="description" content="Edit your client's lastname" />
      </Head>
      <Lastname></Lastname>
    </Fragment>
  );
}

export default LastnamePage;
