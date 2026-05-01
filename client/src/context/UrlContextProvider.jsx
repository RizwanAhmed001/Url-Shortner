import { useState } from "react"
import UrlContext from "./UrlContext"
import { useNavigate } from "react-router-dom";

const UrlContextProvider = ({children}) => {

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const backendUrl = "http://localhost:4000/api/user";

  const navigate = useNavigate();

  const MyValue = {
    token, 
    setToken,
    backendUrl,
    navigate
  } 

  return (
    <UrlContext.Provider value={MyValue}>
      {children}
    </UrlContext.Provider>
  )
}

export default UrlContextProvider;
