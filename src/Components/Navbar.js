import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import './style.css';

const Navbar = () => {
  let Links = [
    { link: "/Pokedex", name: "Pokedex" },
    { link: "/Abilities", name: "Abilities" },
    { link: "/Items", name: "Items" },
    { link: "/Types", name: "Types" },
    { link: "/Search", name: "Search" },
    { link: "/Gacha", name: "Gacha" }
  ];

  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoverMenu, setHoverMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleLinkClick = (link) => {
    setOpen(false);
    navigate(link);
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-40 bg-white">
      <div className="items-center justify-between py-4 md:px-10 px-7 z-1 flex">
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1 z-2">
          <Link to="/" className="logo text-black text-2xl font-bold flex items-center"><span>Ascents&trade;</span></Link>
        </div>
        <div
          onClick={toggleMenu}
          onMouseEnter={() => setHoverMenu(true)}
          onMouseLeave={() => setHoverMenu(false)}
          className="absolute right-8 cursor-pointer md:hidden w-7 h-7 z-3"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        <div className="tolongplis py-4 z-30 w-75">
          <ul
            className={`md:flex md:justify-between md:items-center md:pb-0 bg-gradient-to-b from-white to-white/[0.8] md:bg-inherit pb-4 absolute md:static md:z-auto z-5 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'

              }`}
          >
            <div className="md:flex">
              {Links.map((link, index) => (
                <li
                  className="md:ml-6 md:my-0 my-7 z-6 font-semibold"
                  key={index}
                >
                  <a
                    href={link.link}
                    onClick={() => handleLinkClick(link.link)}
                    className={`${windowWidth <= 768 && !hoverMenu ? '' : 'underline-hover'
                      } z-8 text-gray-800 hover:text-blue-400 duration-500 relative inline-block`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </div>
            <div className="md:flex md:ml-10 flex justify-end transition-all duration-500 ease-in">
              <Link to="/About">
                <button className="btn bg-blue-600 text-white font-semibold px-3 py-1 mr-4 rounded duration-600 mx-auto md:mr-0">About Us</button>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
