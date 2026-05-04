import { useContext } from "react";
import UrlContext from "../context/UrlContext";

const Header = () => {
  const { token, user, navigate, setUser, setToken } = useContext(UrlContext);

  const handleClick = () => {
    localStorage.removeItem("token");
    setToken("");
    localStorage.removeItem("name");
    localStorage.removeItem("image");
    setUser({ name: "", image: "" });
  };

  return (
    <div className="bg-black text-white shadow-md px-6 py-4 flex items-center justify-between">
      
      {/* Logo / Title */}
      <h1 className="text-2xl font-bold tracking-wide text-gray-100">
        Url-Shortner
      </h1>

      {/* Right Section */}
      <div>
        {token ? (
          <div className="flex items-center gap-4">
            
            {/* User Image */}
            <img
              src={user.image}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-gray-600 object-cover"
            />

            {/* Logout Button */}
            <button
              onClick={handleClick}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* Login Button */}
            <button
              onClick={() => navigate("/register")}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition duration-300 border border-gray-600"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
