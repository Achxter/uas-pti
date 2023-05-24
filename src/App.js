import "./index.css"
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home"
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
    <div id="background">
      <div>
        <Navbar />
      </div>
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Pokedex" element={<Pokedex />} />
          <Route path="/Abilities" element={<Abilities />} />
          <Route path="/Items" element={<Items />} />
          <Route path="/Types" element={<Types />} />
          <Route path="/Gacha" element={<Gacha />} />
          <Route path="/Search" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
