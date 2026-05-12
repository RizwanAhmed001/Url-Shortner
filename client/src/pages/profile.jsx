import { useContext, useEffect, useState } from "react";
import UrlContext from "../context/UrlContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const { token, navigate, backendUrl } = useContext(UrlContext);
  const [urlsData, setUrlsData] = useState([]);
  const [toggle, SetToggle] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/register");
    }
  }, [token, navigate]);

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

  const handleClick = async (urlId) => {
    try {
      SetToggle(!toggle)
      console.log(urlId)
      const response = await axios.put(backendUrl + "/url" + "/urlclick", {urlId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if(response.data.success){
        toast.success("Url Updated")
      }else{
        toast.warn(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCopy = (realUrl) => {
  navigator.clipboard.writeText(realUrl);
  toast.success("Copied to clipboard!");
};

  useEffect(() => {
    if (token) {
      allUrls();
    }
  }, [token, toggle]);

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
                <th className="p-3 text-left">Clicks</th>
                <th className="p-3 text-left">Short URL</th>
                <th className="p-3 text-left">Real URL</th>
                <th className="p-3 text-left">Custom</th>
                <th className="p-3 text-left">Copy</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {urlsData.map((url) => {
                return (
                  <tr
                    key={url._id}
                    className="border-t border-gray-800 hover:bg-gray-900 transition"
                  >
                    {/* SHORT URL */}

                    <td className="p-3" onClick={() => handleClick(url._id)}>
                      <a
                        href={url.realUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-400 hover:underline break-all"
                      >
                        {url.shortUrl}
                      </a>
                    </td>

                    <td className="p-3">
                      {url.clicks}
                    </td>

                    {/* REAL URL */}
                    <td className="p-3" onClick={() => handleClick(url._id)}>
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
                    <td onClick={() => handleClick(url._id)} className="p-3 text-yellow-400 break-all">
                      <a href={url.realUrl} target="_blank" rel="noreferrer">
                        {url.customUrl}
                      </a>
                    </td>

                    {/* COPY BUTTON */}
                    <td className="p-3">
                      <button className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 text-sm"
                       onClick={() => handleCopy(url.realUrl)}>
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
