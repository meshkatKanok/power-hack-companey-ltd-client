import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`https://power-hack-companyltd.vercel.app/users/register`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.isHas);
      });
  }, []);
  return [users];
};

export default useUsers;
