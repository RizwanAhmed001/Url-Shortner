
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-[60vh] flex flex-col items-center justify-center px-4">
      
      {/* Error Code */}
      <h1 className="text-7xl font-extrabold text-gray-200 mb-4">
        404
      </h1>

      {/* Message */}
      <p className="text-xl text-gray-400 mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-2 rounded-lg text-sm font-medium transition duration-300"
      >
        Go Back Home
      </button>

    </div>
  );
};

export default Error;