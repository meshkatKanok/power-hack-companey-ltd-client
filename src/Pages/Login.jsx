import axios from "axios";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
const Login = () => {
  const navigate = useNavigate();
  const { auth, refetch } = useContext(AuthContext);
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  /* Handle Login Form  */
  const handleLoginForm = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    /* Validations */
    if (!email) return toast.error("Name field is required.");
    if (!password) return toast.error("Password field is required.");
    /* Call function for login */
    await axios
      .get(
        `https://power-hack-companyltd.vercel.app/users/api/login?email=${email}&&password=${password}`
      )
      .then((res) => {
        const { token, email, success, message } = res.data;
        if (success) {
          axios
            .patch(
              `https://power-hack-companyltd.vercel.app/users/register?email=${email}`,
              {
                isLogin: true,
              }
            )
            .then((res) => {
              const { success } = res.data;
              if (success) {
                toast.success("Login Successfully done");
                localStorage.setItem("accessToken", token);
                navigate("/");
                refetch();
              }
            });
        } else {
          toast.error(message);
        }
      });
  };

  return (
    <section
      id="login"
      className="grid place-items-center sm:h-[85vh] h-screen font-poppins"
    >
      <form
      style={{border:'1px solid gray'}}
        onSubmit={handleLoginForm}
        className="card flex-shrink-0 w-full rounded  max-w-sm rounded"
      >
        <div className="card-body">
          <h3 className="text-lg font-poppins font-semibold">
            Login Now!
          </h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              className="input input-bordered"
              name="email"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              name="password"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn  bg-black text-white">Login Account</button>
          </div>
          <label className="label-text-alt  ">
            New Account?{" "}
            <Link
              to="/register"
              className="label-text-alt link link-hover text-gray-900 font-bold"
            >
              Create An Account
            </Link>
          </label>
        </div>
      </form>
    </section>
  );
};

export default Login;
