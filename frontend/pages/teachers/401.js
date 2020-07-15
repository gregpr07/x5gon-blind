import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/layout";

const Teacher = (props) => {
  return (
    <Layout>
      <div className="pt-128">
        <h4 className="mb-4">You are not a teacher.</h4>
        <Link href="/myprofile">
          <a>Upgrade to teacher account</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Teacher;
