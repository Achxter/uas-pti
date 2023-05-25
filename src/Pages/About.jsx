import React from 'react';
import './About.css';
import hans from '../img/hans.jpg';
import malvin from '../img/malvin.jpg';
import jackson from '../img/jack.jpg';
import willsen from '../img/willsen.jpg';
import Navbar from '../Components/Navbar';
import "../index.css"

function About() {
  const Users = [
    {
      id: 1,
      name: 'Hans Philemon Limanza',
      nim: '00000070710',
      ig: 'https://www.instagram.com/hans.pl',
      profile: '@hans.pl',
      image: hans,
    },
    {
      id: 2,
      name: 'Jackson Lawrence',
      nim: '00000070612',
      ig: 'https://www.instagram.com/jacksonciek/',
      profile: '@jacksonciek',
      image: jackson,
    },
    {
      id: 3,
      name: 'Malvin Paskalis',
      nim: '00000070394',
      ig: 'https://www.instagram.com/malvinpaskalis_/',
      profile: '@malvinpaskalis_',
      image: malvin,
    },
    {
      id: 4,
      name: 'Willsen Fiderick',
      nim: '00000070412',
      ig: 'https://www.instagram.com/willsen_f/',
      profile: '@willsen_f',
      image: willsen,
    },
  ];

  return (
    <div id="background">
      <div className="container mx-auto mt-24 ps-4 py-8">
        <Navbar />
        <h1 className="text-3xl font-bold mb-8">About Us</h1>
        <div className='flex justify-center'>
          <div className="md:grid md:grid-cols-4 md:gap-16">
            {Users.map(user => (
              <div key={user.id} className="flip-card mt-4">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="user-image"
                    />
                    {/* <p className="user-name">{user.name}</p> */}
                  </div>
                  <div className="flip-card-back flex wrap">
                    <p className="user-info">
                      NIM: {user.nim}
                      <br />
                      Instagram: <a href={user.ig}>{user.profile}</a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
