import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Signup = () => {
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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/v1/user/register", input, {
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

  return (
    <div>
      <div className="flex items-center w-screen h-screen justify-center">
        <form onSubmit={submitHandler} className="shadow-lg flex flex-col gap-5 p-8">
          <div>
            <h1 className="text-center font-bold text-xl">LOGO</h1>
            <p className="text-sm text-center">Sign up to explore the world</p>
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
            isLoading ? (<Button><Loader2 className=" animate-spin h-4 w-4"/></Button>) : (<Button type="submit" >Login</Button>)
          }
        <p>Already have an account <Link to="/login" className=" hover:underline font-semibold cursor-pointer">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
