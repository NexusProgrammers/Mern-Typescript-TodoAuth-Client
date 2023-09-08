import React, { useState, FC } from "react";
import { CloseRoundedIcon, MenuOpenRoundedIcon } from "../icons/index";
import Menu from "./Menu";

const Header: FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="bg-gray-600">
      <div className="max-w-7xl mx-auto flex items-center h-16 justify-between px-4 ">
        <div className="w-10 h-10 object-contain">
          <img src="https://img.freepik.com/premium-vector/checklist-complete-tasks-todo-list-survey-exam-concepts-premium-quality-modern-flat-design_189959-533.jpg?w=2000" alt="logo" />
        </div>
        <div className="hidden md:block ">
          <Menu closeMenu={handleToggleMenu} />
        </div>
        <button
          type="button"
          className="md:hidden text-white inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700"
          onClick={handleToggleMenu}
        >
          {showMobileMenu ? <CloseRoundedIcon /> : <MenuOpenRoundedIcon />}
        </button>
      </div>
      <div className="md:hidden">
        {showMobileMenu && <Menu closeMenu={handleToggleMenu} />}
      </div>
    </nav>
  );
};

export default Header;
