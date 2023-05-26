import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Link/*, useMatch, useResolvedPath */} from 'react-router-dom';
import "./Home.css";
import layerBaseImage from "./img/layer-base.webp";
import layerMiddleImage from "./img/layer-middle.webp";
import layerFrontImage from "./img/layer-front.webp";
import pertama from "./img/1.webp";
import kedua from "./img/2.webp";
import ketiga from "./img/3.webp";
import dungeonImage from "./img/dungeon.webp";

gsap.registerPlugin(ScrollTrigger);
function Home() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      let scrollY = window.scrollY;
        document.documentElement.style.setProperty("--scrollTop", `${scrollY}px`);
    });
  }, []);
  const scroller = useRef();
  const skills = useRef();

  useEffect(() => {
    let skillSet = gsap.utils.toArray('.skill-set');

    let to = gsap.to(skillSet, {
      xPercent: () => -100 * (skillSet.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: scroller.current,
        markers: false,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: 1 / (skillSet.length - 1),

        end: () => '+=' + window.innerWidth,
      },
    });
    return () => {
      to.kill();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
      <>
        <div className="wrapper">
          <div className="content">
            <header className="header-main">
              <div className="layers">
                <div className="layer-head">
                  <div className="caption">Welcome to Ascents&trade;</div>
                  <div className="judul">What's your pokemon?</div>
                </div>
                <div className="img-layer layer-base" style={{backgroundImage:`url(${layerBaseImage})`}}></div>
                <div className="img-layer layer-mid" style={{backgroundImage:`url(${layerMiddleImage})`}}></div>
                <div className="img-layer layer-front" style={{backgroundImage:`url(${layerFrontImage})`}}></div>
              </div>
            </header>
            <article className="article-main2" style={{backgroundImage: `url(${dungeonImage})`}}>
                <div className="center-on-page">
                  <div className="pokeball">
                    <div className="pokeball__button"></div>
                  </div>
                </div>
                <div className='m-article-content'>
                  <h2 className="m-header text-base/7">Story To Be Continued</h2>
                  <p className='m-paragraph text-center md:text-justify'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              <div className='copy'>
                Ascents&trade;
              </div>
            </article>
              <div className="overflow-hidden flex">
                <div className="overflow-hidden ">
                  <div
                    id="skills"
                    ref={scroller}
                    className=" flex overflow-x-hidden text-white w-[400vw] m-0 bg-gray-900  relative h-screen"
                  >
                    <section
                      ref={skills}
                      className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
                    >
                      <h1>Hello 1</h1>
                    </section>
                    <section
                      ref={skills}
                      className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
                    >
                      <h1>Hello 2</h1>
                    </section>
                    <section
                      ref={skills}
                      className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
                    >
                      <h1>Hello 3</h1>
                    </section>
                    <section
                      ref={skills}
                      className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
                    >
                      <h1>Hello 4</h1>
                    </section>
                  </div>
                  <div className="line">
                    <div className="line-1">
                      <div className="wave wave1" style={{backgroundImage:`url(${pertama})`}}></div>
                    </div>
                    <div className="line-2">
                      <div className="wave wave2" style={{backgroundImage:`url(${kedua})`}}></div>
                    </div>
                    <div className="line-3">
                      <div className="wave wave3" style={{backgroundImage:`url(${ketiga})`}}></div>
                    </div>	
                  </div>
                  <div className="w-screen h-screen bg-black flex items-center justify-center text-purple-500 font-bungee text-7xl">
                    <div className="kataContent">
                      <div className="centeredContainer">
                        <h2>Are you ready to find your Pokemon?</h2>
                        <form onSubmit={handleSubmit}>
                          <Link to="/About">
                            <button className="tombol" type="submit">Start !</button>
                          </Link>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </>
    // </div>
  );
}

export default Home;