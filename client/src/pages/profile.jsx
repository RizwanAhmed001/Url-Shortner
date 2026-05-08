import { useContext, useEffect, useState } from "react";
import UrlContext from "../context/UrlContext";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const { token, navigate, backendUrl } = useContext(UrlContext);
  const [urlsData, setUrlsData] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/register");
    }
  }, [token, navigate]);

  const allUrls = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/url/alluserurls`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUrlsData(response.data.urls);
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      allUrls();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🔗 Your URLs
      </h2>

      {urlsData.length === 0 ? (
        <p className="text-center text-gray-400">No URLs found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-800 rounded-lg overflow-hidden">
            
            {/* Header */}
            <thead className="bg-gray-900 text-gray-300">
              <tr>
                <th className="p-3 text-left">Short</th>
                <th className="p-3 text-left">Real</th>
                <th className="p-3 text-left">Custom</th>
                <th className="p-3 text-left">Copy</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {urlsData.map((url) => {
                const displayUrl = url.customUrl || url.shortUrl;

                return (
                  <tr
                    key={url._id}
                    className="border-t border-gray-800 hover:bg-gray-900 transition"
                  >
                    {/* Short URL */}
                    <td className="p-3">
                      <a
                        href={displayUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-400 hover:underline break-all"
                      >
                        {url.shortUrl}
                      </a>
                    </td>

                    {/* Real URL */}
                    <td className="p-3">
                      <a
                        href={url.realUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:underline break-all"
                      >
                        {url.realUrl}
                      </a>
                    </td>

                    {/* Custom URL */}
                    <td className="p-3 text-yellow-400 break-all">
                      {url.customUrl ? url.customUrl : "—"}
                    </td>

                    {/* Copy Button */}
                    <td className="p-3">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(displayUrl);
                          toast.success("Copied!");
                        }}
                        className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 text-sm"
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default Profile;