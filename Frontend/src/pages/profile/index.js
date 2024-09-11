import React, { Fragment } from "react";
import Head from "next/head";
import Profile from "@/components/Profile/Profile";

function ProfilePage() {
  return (
    <Fragment>
      <Head>
        <title>SAPPCON Perfil</title>
        <meta
          name="description"
          content="Manage your account settings on our platform. Access and update your personal information, security settings, and preferences. Stay in control of your account details and customize your experience with ease"
        />
      </Head>
      <Profile />
    </Fragment>
  );
}

export default ProfilePage;
