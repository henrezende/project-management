import { useEffect } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import "../app/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const { token } = parseCookies();
    if (
      router.pathname !== "/auth/login" &&
      router.pathname !== "/auth/register" &&
      !token
    ) {
      router.push("/auth/login");
    } else if (
      (router.pathname === "/auth/login" ||
        router.pathname === "/auth/register") &&
      token
    ) {
      router.push("/projects");
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
