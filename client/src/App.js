import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import AdminHome from "./pages/Admin/AdminHome";
import AdminBuses from "./pages/Admin/AdminBuses";
import UserBooking from "./pages/Admin/UserBooking";
import Bookings from "./pages/Bookings";
import AdminUsers from "./pages/Admin/AdminUsers";




function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <div className>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          <Route path="/admin/buses" element={<ProtectedRoute><AdminBuses /></ProtectedRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute>
            <Login /></PublicRoute>} />
          <Route
            path="/book-now/:id"
            element={
              <ProtectedRoute>
                <UserBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
           <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUsers/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
