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

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/orders",
        element: (
          <PrivateRoutes>
            <Order />
          </PrivateRoutes>
        )
      },
      {
        path: "/about",
        element: <h1>About</h1>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <CheckOut />
          </PrivateRoutes>
        )
      },
      {
        path: "/books/:id",
        element: <SingleBook />
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLogin/>,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <div className="">ADMIN DASHBOARD</div>
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <div>Admin Dashboard</div>
      },
      {
        path: "add-book",
        element: <div>Add Book</div>
      },
      {
        path: "edit-book/:id",
        element: <div>Edit Book</div>
      },
      {
        path: "manage-books",
        element: <div>Manage Books</div>
      },
      {
        path: "manage-users",
        element: <div>Manage Users</div>
      }
    ]
  }
]);

export default router;
