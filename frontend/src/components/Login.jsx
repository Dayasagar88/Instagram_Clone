import { useEffect, useState } from "react";
import Logo from "../assets/Images/Logo-Instagram.png";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { LOGIN_URL } from "@/api/apis";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

const Signup = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(store => store?.auth);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);

  const inputChangeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        LOGIN_URL,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setInput({
          email: "••••••••••••••••••••••••••••••••••••••••••••",
          password: "••••••••••••••••••••••••••••••••••••••••••••",
        });
        dispatch(setAuthUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if(user){
      navigate("/")
    }
  },[]);

  return (
    <div>
      <div className="flex items-center w-screen h-screen justify-center">
        <form
          onSubmit={loginHandler}
          className="shadow-lg flex flex-col gap-5 p-8"
        >
          <div>
          <img src={Logo} className="max-w-28 mx-auto" alt="logo" />
            <p className="text-sm text-center">
              Login to your account to explore the world{" "}
            </p>
          </div>
          <div>
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <Input
              name="email"
              value={input.email}
              onChange={inputChangeHandler}
              id="email"
              type="email"
              className="focus-visible:ring-transparent my-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <Input
              name="password"
              value={input.password}
              onChange={inputChangeHandler}
              id="password"
              type="password"
              className="focus-visible:ring-transparent my-2"
            />
          </div>
          {isLoading ? (
            <Button>
              <Loader2 className=" animate-spin h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit">Login</Button>
          )}
          <p>
            {" "}
            {"Don't have an account"}{" "}
            <Link
              to="/signup"
              className=" hover:underline font-semibold cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
