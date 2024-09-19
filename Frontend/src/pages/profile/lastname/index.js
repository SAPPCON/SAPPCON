import React, { Fragment } from "react";
import Head from "next/head";
import Lastname from "@/components/Profile/ProfileUpdate/Lastname";

function LastnamePage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Apellido</title>
        <meta name="description" content="Edit your lastname" />
      </Head>
      <Lastname></Lastname>
    </Fragment>
  );
}

export default LastnamePage;
