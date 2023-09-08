import React, { FC } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  AddRoundedIcon,
  BiLogOutCircle,
  HomeRoundedIcon,
  VpnKeyRoundedIcon,
} from "../icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface MenuProps {
  closeMenu: () => void;
}

const Menu: FC<MenuProps> = ({ closeMenu }) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    navigate("/signin");
    toast.success("Sign out Successfully", {
      duration: 3000,
    });
    closeMenu();
  };

  const handleClickMenuItem = () => {
    closeMenu();
  };

  return (
    <div className="text-white px-2 md:px-0 py-3 space-y-2 md:space-y-0 md:space-x-5 flex xs:flex-col md:flex-row">
      {token && (
        <Link
          to={"/"}
          className="relative cursor-pointer hover:bg-gray-700 p-2 rounded-md flex items-center gap-1"
          onClick={handleClickMenuItem}
        >
          <HomeRoundedIcon fontSize="small" />
          <span className="text-sm">Home</span>
          <span className="absolute"></span>
        </Link>
      )}
      {token && (
        <Link
          to={"/add/todo"}
          className="relative cursor-pointer hover:bg-gray-700 p-2 rounded-md flex items-center gap-1"
          onClick={handleClickMenuItem}
        >
          <AddRoundedIcon fontSize="small" />
          <span className="text-sm"> Todo</span>
          <span className="absolute"></span>
        </Link>
      )}
      {token && (
        <button
          onClick={handleLogout}
          className="relative cursor-pointer hover:bg-gray-700 p-2 rounded-md flex items-center gap-2 "
        >
          <BiLogOutCircle size={18} />
          <span className="text-sm">Sign out</span>
          <span className="absolute"></span>
        </button>
      )}
      {!token && (
        <Link
          to={"/signin"}
          className="relative cursor-pointer hover:bg-gray-700 p-2 rounded-md flex items-center gap-1"
          onClick={handleClickMenuItem}
        >
          <VpnKeyRoundedIcon fontSize="small" />
          <span className="text-sm">Sign In</span>
          <span className="absolute"></span>
        </Link>
      )}
    </div>
  );
};

export default Menu;
