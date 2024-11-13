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


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/orders",
            element:<PrivateRoutes><Order/></PrivateRoutes>
        },
        {
            path: "/about",
            element: <h1>About</h1>,
        },
        {
          path: "/login",
            element: <Login/>,
        },
        {
          path: "/register",
            element: <Register/>,
        },
        {
          path:"/cart",
          element:<Cart/>
        },
        {
          path:"/checkout",
          element:<PrivateRoutes><CheckOut/></PrivateRoutes>
        },
        {
          path:"/books/:id",
          element:<SingleBook/>
        }
      ]
    },
  ]);

 export default router;