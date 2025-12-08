import { routesList } from "../routes/routes";

import Box from "./Box";
import Library from "./Library";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  children?: React.ReactNode;
}

// export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
//   // return <div>{children}</div>;
//   return <h1>Sidebar</h1>;
// };

export function Sidebar({ children }: SidebarProps) {
  // return <div>{children}</div>;
  return (
    <div className="flex h-full">
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
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
}
