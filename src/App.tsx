import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { privateRoutes } from "./routes/privateRoutes";
import { publicRoutes } from "./routes/publicRoutes";
import AppLayout from "./components/layout/AppLayout";
import { useAuthStore } from "./stores/userStore";
import { useEffect, useState } from "react";
import LoadingPage from "./components/common/loading/LoadingPage";

function App() {
  const { userData } = useAuthStore();

   const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., API fetch)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* If the user is authenticated (token exists), allow access to private routes */}
        {userData?.access && (
          <Route
            path="/*"
            element={
              <AppLayout>
                <Routes>
                  {privateRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
                </Routes>
              </AppLayout>
            }
          />
        )}

        {/* If the user is NOT authenticated, redirect to login */}
        {!userData?.access && (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
