import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";


function App() {


  return (
    <>
    <Navbar/>
    <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
    <Outlet/>
    </main>
    <footer>FOOTER</footer>
    </>
  );
}

export default App;
