import { useEffect } from "react";
import { useUser } from "../context/userContext";
import Router from "next/router";

export function ProtectRoute(Component) {
  return () => {
    const { loadingUser, user } = useUser();

    useEffect(() => {
      if (!loadingUser && !user) {
        Router.push("/signIn", "/");
      }
    }, [loadingUser, user]);

    return <Component {...arguments} />;
  };
}
