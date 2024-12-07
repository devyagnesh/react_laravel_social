import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Feed } from "./pages/Feed";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestRoute>
            {" "}
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestRoute>
            {" "}
            <Signup />
          </GuestRoute>
        }
      />
      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
