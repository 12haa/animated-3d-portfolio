"use client";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Bounded from "@/components/Bounded";
import Shapes from "@/slices/Hero/Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".name-animation",
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: "elastic(1,0.3)",
          transformOrigin: "left top",
          delay: 0.8,
          stagger: {
            each: 0.1,
            from: "random",
          },
        },
      );

      tl.fromTo(
        ".job-title",
        {
          y: 20,
          opacity: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "elastic(1,0.3)",
          stagger: {
            each: 0.1,
            from: "center",
          },
        },
      );
    }, component);
    return () => ctx.revert();
  }, []);

  // Animating the letters of the name
  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={` name-animation name-animation-${key} inline-block opacity-0 `}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid grid-cols-1 items-center min-h-[70vh] md:grid-cols-2 ">
        <Shapes />
        <div className="col-start-1 md:row-start-1">
          <h1
            className="mb-8 text-[clamp(4rem,9vmin,4rem)]   font-extrabold  leading-none tracking-tighter  "
            aria-label={slice.primary.firstname + " " + slice.primary.lastname}
          >
            <span className="block text-slate-300 text-[100px]">
              {renderLetters(slice.primary.firstname, "first")}
            </span>
            <span className="block text-slate-500 -mt-[.2em]">
              {renderLetters(slice.primary.lastname, "last")}
            </span>
          </h1>
          <span className=" bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-300 bg-clip-text text-center text-2xl font-bold uppercase text-transparent  opacity-100 job-title tracking-[0.2em] md:text-4xl">
            {slice.primary.tag_line}
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
