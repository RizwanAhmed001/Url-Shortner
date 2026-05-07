import { useContext, useEffect, useState } from "react";
import UrlContext from "../context/UrlContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { token, navigate, backendUrl } = useContext(UrlContext);

  useEffect(() => {
    if (!token) {
      navigate("/register");
    }
  }, [token]);

  return <div>User Url Page</div>;
};

export default Profile;
