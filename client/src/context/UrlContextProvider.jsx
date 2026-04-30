import { useState } from "react"
import UrlContext from "./UrlContext"

const UrlContextProvider = ({children}) => {

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const MyValue = {
    token, 
    setToken
  } 

  return (
    <UrlContext.Provider value={MyValue}>
      {children}
    </UrlContext.Provider>
  )
}

export default UrlContextProvider;
