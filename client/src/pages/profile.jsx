import { useContext, useEffect, useState } from "react";
import UrlContext from "../context/UrlContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { token, navigate, backendUrl } = useContext(UrlContext);

  const [urlsData, setUrlsData] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/register");
    }
  }, [token]);

  const allUrls = async () => {
    try {
      const response = 
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {

  }, [])



  return <div>User Url Page</div>;
};

export default Profile;
