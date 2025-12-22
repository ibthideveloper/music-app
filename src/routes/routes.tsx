import { Sidebar } from "../components/Sidebar";
import { Routes, Route, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Search from "../pages/Search";
import Liked from "../pages/Liked";
import Layout from "../components/Layout";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/search"} element={<Search />}></Route>
        <Route path={"/liked"} element={<Liked />}></Route>
      </Route>
    </Routes>
  );
}

export const routesList = [
  {
    path: "/",
    element: <Home />,
    icon: HiHome,
    label: "Home",
    // children: [],
  },
  { path: "/search", element: <Sidebar />, icon: BiSearch, label: "Search" },
];

export const routes = createBrowserRouter(routesList);
