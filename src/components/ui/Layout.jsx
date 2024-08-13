import { Outlet } from "react-router-dom";
import "../../style/layout.scss";
import Navbar from "../common/Navbar";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
