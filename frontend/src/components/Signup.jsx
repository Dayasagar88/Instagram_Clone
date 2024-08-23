import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value,
    })
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(input)
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
          <Button type="submit" >Sign up</Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
