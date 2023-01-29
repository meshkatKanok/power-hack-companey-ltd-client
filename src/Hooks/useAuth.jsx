import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const { isLoading, data, refetch } = useQuery(
    "AuthData",
    async () =>
      await fetch(`https://power-hack-companyltd.vercel.app/users/register`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json())
  );

  useEffect(() => {
    if (isLoading) return;

    if (data?.user?.isLogin) {
      setAuth(true);
      setUser(data?.user);
    } else {
      setAuth(false);
    }
  }, [data, isLoading]);

  return { auth, refetch, user };
};

export default useAuth;
