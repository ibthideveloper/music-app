import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  path: string;
}

const SidebarItem = ({ icon: Icon, label, path }: SidebarItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        twMerge(
          ` flex flex-row h-auto
            items-center
            w-full
            gap-x-4
            text-md 
            font-medium
            hover:text-white
            transition
            text-neutral-400
            py-1
            `,
          isActive && "text-white"
        )
      }
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </NavLink>
  );
};

export default SidebarItem;
