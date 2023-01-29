import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const Header = () => {
  const { auth, user, refetch, paidTotal} = useContext(AuthContext);

  /* Handle Log Out  */
  const handleLogOut = async () => {
    axios
      .patch(
        `https://power-hack-companyltd.vercel.app/users/register?email=${user?.email}`,
        {
          isLogin: false,
        }
      )
      .then((res) => {
        const { success } = res.data;
        if (success) {
          toast.success("Log Out Successfully done");
          localStorage.removeItem("accessToken");
          refetch();
        }
      });
  };
  return (
    <header className="navbar bg-base-100 shadow">
      <div className="container mx-auto justify-center">
        <div className="flex items-center gap-3 flex-col sm:flex-row sm:items-start  sm:navbar bg-base-100 ">
          <div className="flex-1 flex items-center gap-2 flex-wrap">
            <a
              href="/"
              className="btn btn-ghost text-black font-bold normal-case text-xl"
            >
               POWER HACK COMPANEY LTD
            </a>
            {auth && (
              <div className="total-paid bg-gray-400 text-white px-2 py-1 mx-auto rounded-md">
                Total Paid:{" "}
                <span className="font-raleway font-bold normal-case text-xl">
                  {paidTotal||"000"}
                </span>
              </div>
            )}
          </div>
          <div className="sm:flex-none gap-8 flex items-center ">
           

            {auth ? (
              <div className="users-info flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="avatar w-10 h-10 rounded-full bg-gray-400 text-white font-bold  grid place-items-center border">
                    {user?.name.slice(0, 1)}
                  </div>
                  <span className="font-normal  font-poppins">{user?.name}</span>
                </div>
                <button
                  className="btn btn-error bg-gray-400 border-none text-white btn-sm rounded hover:bg-gray-400"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm btn btn-error bg-gray-400 border-none text-white btn-sm rounded hover:bg-gray-400 ">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
