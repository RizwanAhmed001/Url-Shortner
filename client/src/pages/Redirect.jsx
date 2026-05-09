import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Redirect = () => {
  const { code } = useParams();

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/url/${code}`
        );

        if (res.data.success) {
          // 🔥 REDIRECT TO REAL URL
          window.location.href = res.data.realUrl;
        }
      } catch (error) {
        console.error("URL not found");
      }
    };

    fetchUrl();
  }, [code]);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-xl">Redirecting...</h1>
    </div>
  );
};

export default Redirect;