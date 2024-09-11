import React, { Fragment } from "react";
import Head from "next/head";
import ServiceNav from "@/components/Navigation/ServiceNav";

function ServicePage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Servicios</title>
        <meta
          name="description"
          content="List of all the services you have. Add, modify, delete as needed."
        />
      </Head>
      <ServiceNav />
    </Fragment>
  );
}

export default ServicePage;
