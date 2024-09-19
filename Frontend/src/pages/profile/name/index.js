import React, { Fragment } from "react";
import Head from "next/head";
import Name from "@/components/Profile/ProfileUpdate/Name";

function NamePage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Nombre</title>
        <meta name="description" content="Edit your name" />
      </Head>
      <Name></Name>
    </Fragment>
  );
}

export default NamePage;
