import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { InfinitySpin } from "react-loader-spinner";

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    } else {
      signIn("google", { callbackUrl: "/shipping" });
    }
  }, [router, session, redirect]);

  return (
    <Layout title="Login">
      <div className="flex justify-center items-center h-full">
        <InfinitySpin width="300" color="#1D242D" />
      </div>
    </Layout>
  );
}
