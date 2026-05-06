import { useContext, useEffect, useState } from "react";
import UrlContext from "../context/UrlContext";
import { customAlphabet } from "nanoid";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const { token, navigate, backendUrl } = useContext(UrlContext);

  const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    5,
  );

  useEffect(() => {
    if (!token) {
      navigate("/register");
    }
  });

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
      const response = await axios.post(backendUrl + "/url" + "/addurl", urlData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success("New Url Added");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div>
        <h2>URL SHORTNER</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="realUrl">Long Url</label>
            <input
              value={urlData.realUrl}
              onChange={handleChange}
              type="text"
              id="realUrl"
              name="realUrl"
              required
            />
          </div>
          <div>
            <label htmlFor="shortUrl">Short Url</label>
            <input
              value={urlData.shortUrl}
              type="text"
              id="shortUrl"
              name="shortUrl"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="customUrl">Custom Url</label>
            <input
              value={urlData.customUrl}
              onChange={handleChange}
              type="text"
              id="customUrl"
              name="customUrl"
            />
          </div>

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
