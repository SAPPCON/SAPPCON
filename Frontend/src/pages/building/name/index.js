import React, { Fragment } from "react";
import Head from "next/head";
import Name from "@/components/Building/BuildingUpdate/Name";

function NamePage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Nombre de la Obra</title>
        <meta name="description" content="Edit your building's name" />
      </Head>
      <Name></Name>
    </Fragment>
  );
}

export default NamePage;
