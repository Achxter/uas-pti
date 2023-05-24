import React, { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import './style.css';

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleMenuToggle = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(min-width: 768px)');
//     const handleResize = () => {
//       if (!mediaQuery.matches) {
//         setIsMenuOpen(false);
//       }
//     };

//     handleResize();

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <nav className="nav flex flex-wrap items-center justify-between p-4 bg-blue-500">
//       <Link to="/" className="title text-white text-2xl font-bold">
//         Pokescent
//       </Link>
//       <input
//         type="checkbox"
//         id="navbar-toggle"
//         className="hidden"
//         checked={isMenuOpen}
//         onChange={handleMenuToggle}
//       />
//       <label
//         htmlFor="navbar-toggle"
//         className="toggle-label cursor-pointer"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="w-6 h-6"
//         >
//           <path d="M4 6h16M4 12h16M4 18h16"></path>
//         </svg>
//       </label>
//       <ul
//         className={`nav-links flex flex-col md:flex-row md:ml-auto md:space-x-4 md:items-center ${isMenuOpen ? '' : 'hidden'
//           }`}
//       >
//         <CustomLink to="/About">About</CustomLink>
//         <CustomLink to="/Pokedex">Pokedex</CustomLink>
//         <CustomLink to="/Abilities">Abilities</CustomLink>
//         <CustomLink to="/Items">Items</CustomLink>
//         <CustomLink to="/Types">Types</CustomLink>
//         <CustomLink to="/Search">Search</CustomLink>
//       </ul>
//     </nav>
//   );
// }

function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link
        to={to}
        className="side text-white hover:text-gray-300 font-medium"
      >
        {children}
      </Link>
    </li>
  );
}

const Navbar = () => {
  let Links = [
    { link: "/Pokedex", name: "Pokedex" },
    { link: "/Abilities", name: "Abilities" },
    { link: "/Items", name: "Items" },
    { link: "/Types", name: "Types" },
    { link: "/Search", name: "Search" },
    { link: "/Gacha", name: "Gacha" },
  ];

  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoverMenu, setHoverMenu] = useState(false);

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

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-0">
      <div className="items-center justify-between bg-white py-4 md:px-10 px-7 z-1 flex">
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1 z-2">
          <span>Ascents&trade;</span>
        </div>
        <div
          onClick={toggleMenu}
          onMouseEnter={() => setHoverMenu(true)}
          onMouseLeave={() => setHoverMenu(false)}
          className="absolute right-8 cursor-pointer md:hidden w-7 h-7 z-3"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        <div className="bg-white py-4 z-4 w-75">
          <ul
            className={`md:flex md:justify-between md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-5 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'
              }`}
          >
            <div className='md:flex'>
              {Links.map((link, index) => (
                <li
                  className="md:ml-6 md:my-0 my-7 z-6 font-semibold"
                  key={index}
                >
                  <a
                    href={link.link}
                    className={`${windowWidth <= 768 && !hoverMenu ? '' : 'underline-hover'
                      } z-8 text-gray-800 hover:text-blue-400 duration-500 relative inline-block`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </div>
            <div className="md:flex md:ml-10 flex justify-end transition-all duration-500 ease-in">
              <button className="btn bg-blue-600 text-white font-semibold px-3 py-1 rounded duration-600 mr-4 md:mr-0">
                Get Started
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

// const Navbar = () => {

//     // let Links =[
//     //     {name:"HOME",link:"/"},
//     //     {name:"SERVICE",link:"/"},
//     //     {name:"ABOUT",link:"/"},
//     //     {name:"CONTACT",link:"/"},
//     //   ];
//     let Links =[
//       // {link: "/About", name:"About"},
//       {link: "/Pokedex", name:"Pokedex"},
//       {link: "/Abilities", name:"Abilities"},
//       {link: "/Items", name:"Items"},
//       {link: "/Types", name:"Types"},
//       {link: "/Search", name:"Search"},

//     ];
//     let [open, setOpen] = useState(false);
//     return (
//         <div className='shadow-md w-full fixed top-0 left-0 z-0'>
//            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7 z-1'>
//             {/* logo section */}
//             <div className='font-bold text-2xl cursor-pointer flex items-center gap-1 z-2'>
//                 {/* <BookOpenIcon className='w-7 h-7 text-blue-600'/> */}
//                 <span>Ascents&trade;</span>
//             </div>
//             {/* Menu icon */}
//             <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7 z-3'>
//                 {
//                     open ? <XMarkIcon/> : <Bars3BottomRightIcon />
//                 }
//             </div>
//             {/* linke items */}
//             <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7 mx-auto z-4'>
//               <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-5 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`} >                {
//                     Links.map((link) => (
//                       <li className='md:ml-8 md:my-0 my-7 z-6 font-semibold'>
//                         <a href={link.link} className='underline-hover z-8 text-gray-800 hover:text-blue-400 duration-500 relative inline-block'>{link.name}</a>
//                         {/* <CustomLink to={link.link}>{link.name}</CustomLink> */}
//                         {/* <CustomLink to="/About">About</CustomLink>
//                         <CustomLink to="/Pokedex">Pokedex</CustomLink>
//                         <CustomLink to="/Abilities">Abilities</CustomLink>
//                         <CustomLink to="/Items">Items</CustomLink>
//                         <CustomLink to="/Types">Types</CustomLink>
//                         <CustomLink to="/Search">Search</CustomLink> */}
//                     </li>))
//                 }
//                 <div className='md:flex flex justify-end transition-all duration-500 ease-in ' >
//                   <button className='btn bg-blue-600 text-white font-semibold px-3 py-1 mr-4 rounded duration-600 mx-auto '>Get Started</button>
//                 </div>
//               </ul>
//             </div>
//             {/* button */}
//            </div>
//         </div>
//     );
// };

export default Navbar;
