import "./index.css"
import NavBar from "./Components/Navbar";
import Home from "./Home.js"
import About from "./Pages/About";
import { Route, Routes } from "react-router-dom";
import Search from "./Pages/Search";
import Pokedex from "./Pages/Pokedex"
import Abilities from "./Pages/Abilities";
import Items from "./Pages/Items"
import Types from "./Pages/Types"
import Gacha from "./Pages/Gacha"

function App() {
  return (
    <div>
      {/* <NavBar /> */}
      {/* <div id="background"> */}
        <div className="">
          <Routes>
            {/* <Home /> */}
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Pokedex" element={<Pokedex />} />
            <Route path="/Abilities" element={<Abilities />} />
            <Route path="/Items" element={<Items />} />
            <Route path="/Types" element={<Types />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Gacha" element={<Gacha />} />
          </Routes>
        </div>
      {/* </div> */}
    </div>
  );
}

export default App;
