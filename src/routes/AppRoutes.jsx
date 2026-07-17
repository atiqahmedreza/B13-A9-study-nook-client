import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home';
import Rooms from '../pages/Rooms';
import RoomDetails from '../pages/RoomDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AddRoom from '../pages/AddRoom';
import UpdateRoom from '../pages/UpdateRoom';
import MyListings from '../pages/MyListings';
import MyBookings from '../pages/MyBookings';
import NotFound from '../pages/NotFound';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="rooms/:id" element={<RoomDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="add-room"
          element={
            <ProtectedRoute>
              <AddRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="update-room/:id"
          element={
            <ProtectedRoute>
              <UpdateRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-listings"
          element={
            <ProtectedRoute>
              <MyListings />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
