import { useContext, useEffect, useState } from "react";
import UrlContext from "../context/UrlContext";
import { customAlphabet } from "nanoid";
import { toast } from "react-toastify";
import axios from "axios";

const UrlForm = () => {
  const { token, navigate, backendUrl } = useContext(UrlContext);

  const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    5,
  );

  useEffect(() => {
    if (!token) {
      navigate("/register");
    }
  }, [token]);

  const [urlData, setUrlData] = useState({
    realUrl: "",
    shortUrl: nanoid(),
    customUrl: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUrlData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(backendUrl + "/url/addurl", urlData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success("New Url Added");

        // reset form + generate new short url
        setUrlData({
          realUrl: "",
          shortUrl: nanoid(),
          customUrl: "",
        });
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-[78vh] bg-black flex items-center justify-center overflow-auto">
      <div className="bg-gray-900 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          URL Shortener
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Long URL */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Long URL
            </label>
            <input
              value={urlData.realUrl}
              onChange={handleChange}
              type="text"
              name="realUrl"
              placeholder="Enter long URL..."
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Short URL */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Short URL
            </label>
            <input
              value={urlData.shortUrl}
              type="text"
              name="shortUrl"
              readOnly
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Custom URL */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Custom URL (optional)
            </label>
            <input
              value={urlData.customUrl}
              onChange={handleChange}
              type="text"
              name="customUrl"
              placeholder="Enter custom alias..."
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Shorten URL
          </button>
        </form>
      </div>
    </div>
  );
};

export default UrlForm;
