import axios from "axios";
import toast from "react-hot-toast";

const LoginHelper = (email, token, data) =>{
    
    axios
    .patch(`https://power-hack-companyltd.vercel.app/users/register?email=${email}`, data)
    .then((res) => {
      const { success } = res.data;
      if (success) {
        toast.success("Login Successfully done");
        localStorage.setItem("accessToken", token);
      }
    });
}

export default LoginHelper;