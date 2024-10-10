import { useContext, useEffect } from "react";
import "./App.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import Product from "./screens/Product/Product";
import Category from "./screens/Category/Category";
import UpdateProduct from "./screens/UpdateProduct/UpdateProduct";
import Signin from "./screens/Signin/Signin";
import ProtectedRoutes from '../src/screens/ProtectedRoutes/ProtectedRoutes';  
import { SidebarProvider } from './context/SidebarContext'; 
import { Offline } from "react-detect-offline"; // استيراد مكون Offline

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <SidebarProvider>
        <Router>
          <Routes>
            <Route element={<BaseLayout />}>
              {/* Public Routes */}
              <Route path="signin" element={<Signin />} />
              
              {/* Protected Routes */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoutes>
                    <Dashboard />
                  </ProtectedRoutes>
                } 
              />
              <Route 
                path="Product" 
                element={
                  <ProtectedRoutes>
                    <Product />
                  </ProtectedRoutes>
                } 
              />
              <Route 
                path="Category" 
                element={
                  <ProtectedRoutes>
                    <Category />
                  </ProtectedRoutes>
                } 
              />
              <Route 
                path="updateProduct" 
                element={
                  <ProtectedRoutes>
                    <UpdateProduct />
                  </ProtectedRoutes>
                } 
              />
              
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
          >
            <img
              className="theme-icon"
              src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
              alt="Theme toggle icon"
            />
          </button>
          
        </Router>

        {/* Message to show when user is offline */}
        <Offline>
          <div className="offline-message">
            <p>⚠️ You are currently offline. Please check your internet connection.</p>
          </div>
        </Offline>
      </SidebarProvider>
    </>
  );
}

export default App;
