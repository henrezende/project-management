import { useEffect } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      router.push("/projects");
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  return null;
};

export default Index;
