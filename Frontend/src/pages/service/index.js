import React, { Fragment } from "react";
import Head from "next/head";
import ServiceNav from "@/components/Navigation/ServiceNav";
import Service from "@/components/Service/Service";

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
      <Service />
    </Fragment>
  );
}

export default ServicePage;
