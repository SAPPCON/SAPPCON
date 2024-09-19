import React, { Fragment } from "react";
import Head from "next/head";
import Username from "@/components/Profile/ProfileUpdate/Username";

function UsernamePage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Cambiar Nombre de Usuario</title>
        <meta name="description" content="Edit your username" />
      </Head>
      <Username></Username>
    </Fragment>
  );
}

export default UsernamePage;
