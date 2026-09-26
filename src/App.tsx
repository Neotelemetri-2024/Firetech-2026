import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loading from "./components/loading";
import ScrollToTop from "./components/scrolltotop";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AdminRoute from "./components/AdminRoute";

//Layouts (Navbar dan Footer)//
import MainLayout from "./layouts/mainlayout";
import AdminLayout from "./layouts/adminlayout";

//Firetech//
import Firetech from "./pages/firetech";

//User//
import Home from "../src/pages/user/home";
import Apply from "../src/pages/user/apply";

//Auth//
import Auth from "./pages/auth/login";

//Admin//
import Admin from "./pages/admin/dashboard";
import User from "./pages/admin/user";
import Event from "./pages/admin/event";

//Not Found//
import NotFound from "./pages/notfound";

//Context Theme//
import { ThemeProvider } from "./context/themecontext";

//AOS//
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  console.log("GOOGLE CLIENT ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <Router>
          <ScrollToTop />

          <Routes>
            {/* Auth */}
            <Route path="/login" element={<Auth />} />

            {/* Firetech */}
            <Route path="/" element={<Firetech />} />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<Admin />} />
              <Route path="users" element={<User />} />
              <Route path="event" element={<Event />} />
            </Route>

            {/* User */}
            <Route path="/home" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="users" element={<Home />} />
              <Route path="apply" element={<Apply />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <AnimatePresence>{loading && <Loading />}</AnimatePresence>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;