import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./stores/tokenStore";
import { privateRoutes } from "./routes/privateRoutes";
import { publicRoutes } from "./routes/publicRoutes";
import AppLayout from "./components/layout/AppLayout";

function App() {

  const {userData} = useAuthStore();

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
        {!userData?.access_token && (
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
        {!userData?.access_token && <Route path="/*" element={<Navigate to="/login" />} />}
      </Routes>
    </Router>
  );
}

export default App;
