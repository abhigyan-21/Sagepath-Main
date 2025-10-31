import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { useLocation } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/homepage", element: <Homepage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/community", element: <CommunityPage /> },
    { path: "/course", element: <CoursePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/profile", element: <ProfilePage /> },
];

function App() {
    
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme === "dark" : true;
    });


    useEffect(() => {
        const theme = darkMode ? "dark" : "light";
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [darkMode]);

    return (
        <BrowserRouter>
            {/* Hide Navbar on root story and login pages */}
            <ConditionalNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;

function ConditionalNavbar(props) {
    const location = useLocation();
    const hidePaths = ["/", "/login"];
    if (hidePaths.includes(location.pathname)) return null;
    return <Navbar {...props} />;
}
