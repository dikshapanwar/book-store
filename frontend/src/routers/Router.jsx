import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../pages/book/Cart";


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
            element: <h1>Orders</h1>,
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
        }
      ]
    },
  ]);

 export default router;