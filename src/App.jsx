import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { verifyAuth, isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is authenticated via cookie on app load
    if (!isAuthenticated) {
      const checkAuth = async () => {
        await verifyAuth();
      };
      checkAuth();
    }
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
