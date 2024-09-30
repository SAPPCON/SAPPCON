import React, { Fragment } from "react";
import Head from "next/head";
import Description from "@/components/Building/BuildingUpdate/Description";

function DescriptionPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Descripción del la Obra</title>
        <meta name="description" content="Edit your building's description" />
      </Head>
      <Description></Description>
    </Fragment>
  );
}

export default DescriptionPage;
