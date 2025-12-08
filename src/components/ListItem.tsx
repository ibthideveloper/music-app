import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: any; // Type must be updated
  name: string;
  href: string;
}

const ListItem = ({ image, name, href }: ListItemProps) => {
  const onClick = () => {
    // Authenticate
    // Routing
  };

  return (
    <div>
      <button
        className="relative group flex items-center rounded-md overflow-hidden gap-x-4 
    bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4
      "
      >
        <div className="relative max-h-16 max-w-16">
          <img className="object-cover fill" src={image} alt="image" />
        </div>
        <p className="font-medium truncate py-5">{name}</p>
        <div
          className=" transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md
         group-hover:opacity-100 hover:scale-110"
        >
          <FaPlay className="text-black" />
        </div>
      </button>
    </div>
  );
};

export default ListItem;
