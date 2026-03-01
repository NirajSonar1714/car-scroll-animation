import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const carRef = useRef(null);
  const trialRef = useRef(null);

  const text = "WELCOME ITZFIZZ".split("");
  const bgColors = [
    "bg-yellow-300",
    "bg-blue-300",
    "bg-orange-400",
    "bg-green-400",
    "bg-purple-300",
    "bg-pink-300",
    "bg-gray-700 text-white",
  ];

  const statsData = [
    {
      value: "72%",
      label: "Faster order processing time",
      position: "top-[8%] right-[32%]",
    },
    {
      value: "1.8x",
      label: "Increase in delivery efficiency",
      position: "bottom-[8%] right-[38%]",
    },
    {
      value: "45%",
      label: "Reduction in customer wait time",
      position: "top-[8%] right-[5%]",
    },
    {
      value: "3.2M+",
      label: "Orders successfully fulfilled",
      position: "bottom-[8%] right-[13%]",
    },
  ];

  const getRandomColor = () =>
    bgColors[Math.floor(Math.random() * bgColors.length)];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.to(carRef.current, {
        x: () => window.innerWidth - carRef.current.offsetWidth * 0.4,
        ease: "none",
      }, 0).to(trialRef.current, {
        width: () => window.innerWidth - carRef.current.offsetWidth * 0.2,
        ease: "none",
      }, 0);

      tl.from(".letter", {
        y: 0,
        ease: "none",
      }, 0);

      gsap.to(".stats", {
        opacity: 1,
        y: 0,
        stagger: 0.6,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top+=20% top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="min-h-[400vh] bg-gray-100 relative">
      <div className="min-h-screen flex items-center justify-center">
        {/* Road */}
        <div className="fixed bg-black w-full flex items-center h-48 road">
          {/* Trial */}
          <div
            ref={trialRef}
            className="bg-green-400 w-[75px] h-full absolute"
          ></div>

          {/* Letters */}
          <div className="w-full h-full overflow-hidden flex items-center justify-center gap-1">
            {text.map((letter, index) => (
              <span
                key={index}
                className="text-9xl text-black font-bold letter"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>

          {/* Car */}
          <img
            src="/car-scroll-animation/car.png"
            alt="car"
            ref={carRef}
            className="w-100 absolute"
          />
        </div>
      </div>

      {/* Stats */}
      {statsData.map((stat, index) => (
        <div
          key={index}
          className={`px-6 py-8 fixed rounded-lg opacity-0 stats ${getRandomColor()} ${stat.position}`}
        >
          <span className="block text-5xl mb-2 font-bold">{stat.value}</span>
          <span className="text-xl">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
