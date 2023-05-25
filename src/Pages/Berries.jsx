import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';

const Berries = () => {
  const [berryData, setBerryData] = useState(null);
  const [berryInput, setBerryInput] = useState('');
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  const handleInputChange = (event) => {
    setBerryInput(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (berryInput.trim() !== '') {
      fetchBerryData();
    }
  };

  const fetchBerryData = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/berry/${berryInput}`);
      if (response.status === 200) {
        setBerryData(response.data);
        setShowNoDataMessage(false);
      } else {
        setBerryData(null);
        setShowNoDataMessage(true);
      }
    } catch (error) {
      console.log(error);
      setBerryData(null);
      setShowNoDataMessage(true);
    }
  };

  return (
    <div id="background">

    <div className="container mx-auto capitalize mt-24">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Berry Information</h1>
      <form onSubmit={handleFormSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter Berry ID or Name"
          value={berryInput}
          onChange={handleInputChange}
          className="border border-gray-300 rounded p-2 mr-2"
          />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
      {showNoDataMessage && <p className="text-red-500">Oops.. No data found</p>}
      {berryData && (
        <div className="border border-gray-300 rounded p-4">
          <h2 className="text-xl font-bold mb-2">{berryData.name} Berry</h2>
          <p>
            <span className="font-bold">Firmness:</span> {berryData.firmness.name}
          </p>
          <p>
            <span className="font-bold">Size:</span> {berryData.size}
          </p>
          <p>
            <span className="font-bold">Smoothness:</span> {berryData.smoothness}
          </p>
          <p>
            <span className="font-bold">Growth Time:</span> {berryData.growth_time}
          </p>
          <p>
            <span className="font-bold">Flavors:</span>{' '}
            {berryData.flavors.map((flavor) => flavor.flavor.name).join(', ')}
          </p>
        </div>
      )}
    </div>
      </div>
  );
};

export default Berries;
