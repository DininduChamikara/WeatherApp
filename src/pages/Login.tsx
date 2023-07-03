import React, { useRef, useState } from "react";
import backgroundImage from "../images/weather_bg.jpg";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const formRef = useRef(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (form.username === "admin" && form.password === "123"){
      // alert("Login Successfull");
      navigate("/home")
    }else {
      alert("Invalid username or password");
    }

  }

  return (
    <div
      className="relative w-full h-screen mx-auto"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute top-20 left-20 opacity-80 w-1/3">
        <div className="border-2 border-gray-300 p-2 rounded-2xl">
          <div className="px-6 py-4 bg-gray-500 rounded-2xl">
            <div className="font-bold text-5xl mb-2 text-blue-900">
              Weather App
            </div>
            <div className="font-bold text-4xl mb-2 text-white">Login here</div>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">Username</span>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter the username"
                  required
                  className="py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">Password</span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter the password"
                  required
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium"
                />
              </label>

              <button className="bg-blue-200 py-3 px-8 mt-3 mb-6 hover:bg-blue-900 text-blue-700 font-bold hover:text-white border border-blue-500 hover:border-transparent rounded-xl">
                Click to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
