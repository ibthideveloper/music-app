import { Outlet } from "react-router-dom";
import { routesList } from "../routes/routes";
import usePlayer from "../hooks/usePlayer";

import Box from "./Box";
import Library from "./Library";
import SidebarItem from "./SidebarItem";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children?: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const player = usePlayer();

  return (
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div
        className="hidden md:flex flex-col gap-y-2 bg-black h-full
       w-[300px] p-2"
      >
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routesList.map((routeItem) => (
              <SidebarItem
                key={routeItem.path}
                label={routeItem.label}
                icon={routeItem.icon}
                path={routeItem.path}
              />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        {children || <Outlet />}
      </main>
    </div>
  );
}
