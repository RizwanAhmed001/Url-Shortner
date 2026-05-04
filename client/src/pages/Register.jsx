import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import UrlContext from "../context/UrlContext";

const Register = () => {
  const { backendUrl, token, navigate, setToken, user, setUser } = useContext(UrlContext);

  const [login, setLogin] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setUserData((user) => ({
      ...user,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (login) {
        response = await axios.post(backendUrl + "/login", {
          email: userData.email,
          password: userData.password,
        });
      } else {
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        formData.append("image", userData.image);

        response = await axios.post(backendUrl + "/register", formData);
      }

      if (response.data.success) {
        toast.success(
          `${login ? "Login Successfully!" : "Signup Successfully!"}`,
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.user.name)
        localStorage.setItem("image", response.data.user.image)
        setToken(response.data.token);
        setUser({name: localStorage.getItem("name"), image: localStorage.getItem("image")})

        navigate("/");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-neutral-900 p-8 rounded-2xl shadow-lg w-full max-w-md border border-neutral-800">
        <h1 className="text-2xl font-bold text-center mb-4">
          Hold up! Let's login first..
        </h1>

        {/* Toggle Buttons */}
        <div className="flex bg-neutral-800 p-1 rounded-xl mb-4 gap-2">
          <button
            onClick={() => setLogin(true)}
            className={`w-1/2 py-2 rounded-lg font-medium transition-all duration-200 ${
              login
                ? "bg-white text-black shadow-md scale-105"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setLogin(false)}
            className={`w-1/2 py-2 rounded-lg font-medium transition-all duration-200 ${
              !login
                ? "bg-white text-black shadow-md scale-105"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Signup
          </button>
        </div>

        {login ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Login</h2>
            <p className="text-sm text-gray-400">
              to your account if you already have one
            </p>

            <input
              type="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              name="email"
              className="w-full p-2 rounded-lg bg-neutral-800 placeholder-gray-400 focus:outline-none border border-neutral-700"
            />

            <input
              type="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              name="password"
              className="w-full p-2 rounded-lg bg-neutral-800 placeholder-gray-400 focus:outline-none border border-neutral-700"
            />

            <button className="px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition">
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Signup</h2>
            <p className="text-sm text-gray-400">
              Create a new account if you haven't already
            </p>

            <input
              type="text"
              value={userData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              name="name"
              className="w-full p-2 rounded-lg bg-neutral-800 placeholder-gray-400 focus:outline-none border border-neutral-700"
            />

            <input
              type="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              name="email"
              className="w-full p-2 rounded-lg bg-neutral-800 placeholder-gray-400 focus:outline-none border border-neutral-700"
            />

            <input
              type="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              name="password"
              className="w-full p-2 rounded-lg bg-neutral-800 placeholder-gray-400 focus:outline-none border border-neutral-700"
            />

            <input
              type="file"
              onChange={handleChange}
              name="image"
              className="w-full text-sm text-gray-400 file:bg-white file:text-black file:px-4 file:py-2 file:rounded-lg file:border-0"
            />

            <button className="px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition">
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
