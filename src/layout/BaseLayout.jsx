import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";
import { SidebarContext } from "../context/SidebarContext"; // استيراد سياق الشريط الجانبي
import { FaHelicopter } from "react-icons/fa"; // استيراد أيقونة المروحية من react-icons

const BaseLayout = () => {
  const { isSidebarOpen, openSidebar } = useContext(SidebarContext); // استخدام السياق هنا

  return (
    <main className="page-wrapper">
      {/* عرض الزر فقط إذا كان الشريط الجانبي مغلقًا */}
      {!isSidebarOpen && (
        <button onClick={openSidebar} className="toggle-sidebar-btn">
          {/* استبدال النص بالأيقونة */}
          <FaHelicopter size={24} style={{ color: "blue" }} />
        </button>
      )}
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
        <Outlet />
      </div>
    </main>
  );
};

export default BaseLayout;

