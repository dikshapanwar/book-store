import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="min-h-screen max-w-screen-2xl mx-auto px-10 py-6 font-primary">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer/>
    </>
  );
}

export default App;
