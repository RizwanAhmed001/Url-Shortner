import { useContext, useEffect, useState } from "react";
import UrlContext from "../context/UrlContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const { token, navigate, backendUrl } = useContext(UrlContext);
  const [urlsData, setUrlsData] = useState([]);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/register");
    }
  }, [token, navigate]);

  // 📡 Fetch all URLs
  const allUrls = async () => {
    try {
      const response = await axios.get(`${backendUrl}/url/alluserurls`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      <h2 className="text-2xl font-bold mb-6 text-center">🔗 Your URLs</h2>

      {urlsData.length === 0 ? (
        <p className="text-center text-gray-400">No URLs found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-800 rounded-lg overflow-hidden">
            {/* HEADER */}
            <thead className="bg-gray-900 text-gray-300">
              <tr>
                <th className="p-3 text-left">Short URL</th>
                <th className="p-3 text-left">Real URL</th>
                <th className="p-3 text-left">Custom</th>
                <th className="p-3 text-left">Copy</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {urlsData.map((url) => {
                const code = url.customUrl || url.shortUrl;

                // 🔥 THIS IS THE MAIN FIX
                const shortLink = `${backendUrl}/url/${code}`;

                return (
                  <tr
                    key={url._id}
                    className="border-t border-gray-800 hover:bg-gray-900 transition"
                  >
                    {/* SHORT URL */}

                    <td className="p-3">
                      <Link
                        to="#"
                        onClick={() => {
                          const code = url.customUrl || url.shortUrl;
                          const shortLink = `${backendUrl}/url/${code}`;
                          window.open(shortLink, "_blank"); // 🔥 open backend route
                        }}
                        className="text-green-400 hover:underline break-all"
                      >
                        {backendUrl}/url/{url.customUrl || url.shortUrl}
                      </Link>
                    </td>

                    {/* REAL URL */}
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

                    {/* CUSTOM URL */}
                    <td className="p-3 text-yellow-400 break-all">
                      {url.customUrl ? url.customUrl : "—"}
                    </td>

                    {/* COPY BUTTON */}
                    <td className="p-3">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(shortLink);
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
