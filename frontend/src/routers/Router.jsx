import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../pages/book/Cart";
import CheckOut from "../pages/book/CheckOut";
import SingleBook from "../pages/book/SingleBook";
import PrivateRoutes from "./PrivateRoutes";
import Order from "../pages/book/Order";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBooks from "../pages/dashboard/addbooks/AddBooks";
import UpdateBook from "../pages/dashboard/editBooks/UpdateBook";
import Wishlist from "../pages/book/Wishlist";
//import SearchResults from "../components/Search";
import AddNews from "../pages/dashboard/addnews/AddNews";
import ManageNews from "../pages/dashboard/manageNews/ManageNews";
import SingleNews from "../pages/book/SingleNews";
import AllOrder from "../pages/dashboard/orders/AllOrder";
import View from "../pages/dashboard/orders/View";
import SearchResults from "../components/Search";
import Subscribe from "../pages/dashboard/Subscribe/Subscribe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/search",
      //   element: <SearchResults />
      // },
      {
        path: "/orders",
        element: (
          <PrivateRoutes>
            <Order />
          </PrivateRoutes>
        ),
      },
      {
        path: "/about",
        element: <h1>About</h1>,
      },
      {
        path: "/search",
        element: <SearchResults/>
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <CheckOut />
          </PrivateRoutes>
        ),
      },
      {
        path: "/books/:id",
        element: <SingleBook />,
      },
      {
        path: "/news/:id",
        element: <SingleNews />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "add-book",
        element: (
          <AdminRoute>
            <AddBooks />
          </AdminRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <AdminRoute>
            <UpdateBook />
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: <div>Manage Users</div>,
      },
      {
        path: "add-news",
        element: (
          <AdminRoute>
            <AddNews />
          </AdminRoute>
        ),
      },
      {
        path: "manage-news",
        element: (
          <AdminRoute>
            <ManageNews />
          </AdminRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminRoute>
            <AllOrder />
          </AdminRoute>
        ),
      },
      {
        path: "order/:id",
        element: (
          <AdminRoute>
            <View />
          </AdminRoute>
        ),
      },
      {
        path:"subscribers",
        element:<AdminRoute><Subscribe/></AdminRoute>
      }
    ],
  },
]);

export default router;
