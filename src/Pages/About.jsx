import React from 'react';
import './About.css';
import hans from '../img/hans.webp';
import malvin from '../img/malvin.webp';
import jackson from '../img/jack.webp';
import willsen from '../img/willsen.webp';
import Navbar from '../Components/Navbar';
import '../index.css';
import umn from "../img/UMN-1.webp";
import umnBulet from "../img/UMN-bulet.webp";

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

  const Links = [
    {
      id: 1,
      fill: <a className="" href="https://tailwindcss.com">Tailwind CSS</a>
    },
    {
      id: 2,
      fill: <a className="" href="https://youtube.com">YouTube</a>
    },
    {
      id: 3,
      fill: <a className="" href="https://heroicons.com">Heroicons</a>
    },
    {
      id: 4,
      fill: <a className="" href="https://www.deviantart.com">DeviantArt</a>
    },
    {
      id: 5,
      fill: <a className="" href="https://fonts.google.com">Google Fonts</a>
    },
    {
      id: 6,
      fill: <a className="" href="https://uiverse.io">Uiverse</a>
    },
    {
      id: 7,
      fill: <a className="" href="https://www.w3schools.com">W3Schools</a>
    }
  ];

  return (
    <div id="background">
      <Navbar />
      <div className="container mx-auto mt-8 md:mt-16 px-4 pt-8">
        <div className='bg-white/[.06] shadow-2xl backdrop-blur rounded-md px-1 py-4 mt-4'>
          <div className="mt-8">
            <div className='about flex justify-center'>
              <h1 className="text-3xl font-bold mb-4 text-center-mobile ">
                About Us
              </h1>
            </div>
            <div className="flex justify-center mt-12">
              <div className="md:grid md:grid-cols-2 md:gap-16 lg:grid-cols-4">
                {Users.map((user) => (
                  <div key={user.id} className="flip-card mt-4 flip-card-small w-60 h-80 md:w-48 md:h-64 xl:w-60 xl:h-80">
                    <div className="flip-card-inner">
                      <div className="flip-card-front fixed relative">
                        <img src={user.image} alt={user.name} className="user-image" />
                      </div>
                      <div className="flip-card-back flex wrap">
                        <div className='logoWEMEN'>
                          <div className="umnBulet">
                            <img src={umnBulet} alt="UMN Circle" />
                          </div>
                          <div className='umn'>
                            <a href="https://www.umn.ac.id/en/home/">
                              <img src={umn} alt="UMN" />
                            </a>
                          </div>
                        </div>
                        <div className="user-info mt-4">
                          {user.nim}
                          <br />
                          <span className='untukNama'>{user.name}</span>
                          <br />
                          <p>Informatika</p>
                          <p className='italic'>Agustus 2026</p>
                          <span className='igNiha'>Instagram: <a href={user.ig} className='igNih'>{user.profile}</a></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="atasin">
              <div className='about flex justify-center mt-40'>
                <h1 className="text-3xl font-bold mb-4 text-center-mobile">
                  References
                </h1>
              </div>
              <div className='flex flex-col items-center'>
                {Links.map(link => (
                  <div className="flex items-center bg-slate-100/[.9] p-4 rounded-md justify-center w-1/2 md:w-1/4 my-2" key={link.id}>
                    <img src="" className="bullet mr-4" alt="" />
                    <p className="hover:translate-x-1 duration-100 ease-in-out"><a className="font-bold text-black hover:text-blue-500" href={link.fill.props.href}>{link.fill.props.children}</a></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default About;
