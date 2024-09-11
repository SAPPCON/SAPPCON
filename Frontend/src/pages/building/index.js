import React, { Fragment } from "react";
import Head from "next/head";
import BuildingNav from "@/components/Navigation/BuildingNav";

function BuildingPage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Obras</title>
        <meta
          name="description"
          content="List of all the buildings you have. Add, modify, delete as needed."
        />
      </Head>
      <BuildingNav />
    </Fragment>
  );
}

export default BuildingPage;
