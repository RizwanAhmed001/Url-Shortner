import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Error from "./pages/Error";

function App() {
  const location = useLocation();

  return (
    <div className="bg-black min-h-screen text-white">
      
      {/* Toast */}
      <ToastContainer 
        theme="dark"
        position="top-right"
        autoClose={3000}
      />

      {/* Header (hidden on register page) */}
      {location.pathname === "/register" ? null : <Header />}

      {/* Main Content */}
      <div className="px-4 md:px-10 py-6">
        <Routes>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<Error />} path="*" />
        </Routes>
      </div>
    </div>
  );
}

export default App;