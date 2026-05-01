import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </div>
  );
}

export default App;
