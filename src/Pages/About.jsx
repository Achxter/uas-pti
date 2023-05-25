import React from 'react';
import './About.css';
import hans from '../img/hans.jpg';
import malvin from '../img/malvin.jpg';
import jackson from '../img/jack.jpg';
import willsen from '../img/willsen.jpg';
import Navbar from '../Components/Navbar';
import '../index.css';

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
        <div className="mt-8">
          <div className='about flex justify-center'>
            <h1 className="text-3xl font-bold mb-8 text-center-mobile">
              About Us
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="md:grid md:grid-cols-4 md:gap-24">
              {Users.map(user => (
                <div key={user.id} className="flip-card mt-4 flip-card-small">
                  <div className="flip-card-inner">
                    <div
                      className="flip-card-front fixed"
                    // style={{backgroundImage: `url(${user.image})`}}>
                    >
                      <img
                        src={user.image}
                        alt={user.name}
                        className="user-image"
                      />
                      {/* <p className="user-name">{user.name}</p> */}
                    </div>
                    <div className="flip-card-back flex wrap">
                      <p className="user-info">
                        Name: {user.name}
                        <br />
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
          {/* <div className="text-white">
            <br></br>
            <p className="font-bold">References</p>
            <p>Tailwind CSS</p>
            <p>React JS</p>
            <p>UIVerse</p>
            <p>W3Schools</p>
            <p>Hero Icons</p>
            <p>PokeAPI</p>
            <p>Google Fonts</p>
            <p>YouTube</p>
          </div> */}
          <div className="atasin">
            <div className='about flex justify-center'>
              <h1 className="text-3xl font-bold mb-8 text-center-mobile">
                References
              </h1>
            </div>
            <div className="d-flex mt-5">
              <img src="" className="bullet" alt="" />
              <p className="mb-1">Bootstrap. Retrieved from <a className="hyper" href="https://getbootstrap.com">https://getbootstrap.com</a></p>
            </div>
            <div className="d-flex mt-5">
              <img src="" className="bullet" alt="" />
              <p className="mb-1">Musics. Retrieved from <a className="hyper" href="https://youtu.be/y9E0tfsZaOU">https://youtu.be/y9E0tfsZaOU</a></p>
            </div>
            <div className="d-flex mt-5">
              <img src="" className="bullet" alt="" />
              <p className="mb-1">Icons. Retrieved from <a className="hyper" href="https://freepik.com">https://freepik.com</a></p>
            </div>
            <div className="d-flex mt-5">
              <img src="" className="bullet" alt="" />
              <p className="mb-1">GIFs. Retrieved from <a className="hyper" href="https://tenor.com">https://tenor.com</a></p>
            </div>
            <div className="d-flex mt-5">
              <img src="" className="bullet" alt="" />
              <p className="mb-1">Font. Retrieved from <a className="hyper" href="https://fonts.google.com">https://fonts.google.com</a></p>
            </div>
            <div className="d-flex mt-5">
              <img src="" className="bullet" alt="" />
              <p className="mb-1">User Interfaced. Retrieved from <a className="hyper" href="https://uiverse.io">https://uiverse.io</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
