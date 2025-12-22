import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import Player from "./Player";

const Layout = () => {
  return (
    <div className="h-full">
      <Sidebar>
        <Outlet />
      </Sidebar>
      <Player />
    </div>
  );
};

export default Layout;
