import { useEffect, useState } from "react";
import Logo from "../Images/Logo-Instagram.png";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { SIGNUP_URL } from "@/api/apis";
import { useSelector } from "react-redux";

const Signup = () => {
  
  const {user} = useSelector(store => store?.auth);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);

  const inputChangeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value,
    })
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(SIGNUP_URL, input, {
        headers : {
          'Content-Type' : 'application/json'
        },
        withCredentials: true
      })
     
      if(res.data.success){
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        })
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    } finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    if(user){
      navigate("/")
    }
  },[]);

  return (
    <div>
      <div className="flex items-center w-screen h-screen justify-center">
        <form onSubmit={signupHandler} className="shadow-lg flex flex-col gap-5 p-8">
          <div>
            <img src={Logo} className="max-w-28 mx-auto" alt="logo" />
            <p className="text-sm text-center">Create your account to explore the world</p>
          </div>
          <div>
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <Input
              name="username"
              value={input.username}
              onChange={inputChangeHandler}
              id="username"
              type="text"
              className="focus-visible:ring-transparent my-2"
            />
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
          {
            isLoading ? (<Button><Loader2 className=" animate-spin h-4 w-4"/></Button>) : (<Button type="submit" >Sign up</Button>)
          }
        <p>Already have an account <Link to="/login" className=" hover:underline font-semibold cursor-pointer">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
