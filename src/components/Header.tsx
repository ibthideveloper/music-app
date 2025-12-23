import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useRef } from "react";

import useAuthModal from "../hooks/useAuthModal";
import { useUser } from "../hooks/useUser";
import { supabase } from "../lib/supabaseClient";
import Button from "./Button";
import toast from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const navigate = useNavigate();
  const { onOpen } = useAuthModal();
  const ref = useRef(null);
  const { user } = useUser();
  const supabaseClient = supabase;

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    navigate(".", { replace: true });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out!");
    }
  };

  return (
    <div
      className={twMerge(
        `h-fit w-full bg-linear-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            className="bg-black cursor-pointer rounded-full flex items-center justify-center hover:opacity-75 transistion "
            onClick={() => navigate(-1)}
          >
            <RxCaretLeft size={35} />
          </button>
          <button
            className="bg-black cursor-pointer rounded-full flex items-center justify-center hover:opacity-75 transistion "
            onClick={() => navigate(1)}
          >
            <RxCaretRight size={35} />
          </button>
        </div>

        {/* Start of Mobile view */}
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition cursor-pointer"
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            onClick={() => navigate("/search")}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition cursor-pointer"
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        {/* End of Mobile view */}

        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                ref={ref}
                onClick={handleLogout}
                className="bg-white px-6 py-2"
              >
                Logout
              </Button>
              <Button ref={ref} onClick={() => navigate("/account")}>
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  className="bg-transparent text-neutral font-medium"
                  ref={ref}
                  onClick={onOpen}
                >
                  Sign Up
                </Button>
              </div>

              <div>
                <Button
                  className="bg-white  px-6 py-2"
                  ref={ref}
                  onClick={onOpen}
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
