import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="min-h-screen max-w-screen-2xl mx-auto px-6 py-6 font-primary">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
