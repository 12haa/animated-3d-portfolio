"use client";
import React, { useEffect, useRef } from "react";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { gsap } from "gsap";
type AvatarProps = {
  image: ImageField;
  className?: string;
};
const Avatar = ({ image, className }: AvatarProps) => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        {
          opacity: 0,
          scale: 1.4,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "power3.inOut",
        },
      );
      window.onmousemove = (e) => {
        if (!component.current) return;
        const componentRect = (
          component.current as HTMLElement
        ).getBoundingClientRect();

        const componentCenterX = componentRect.left + componentRect.width / 2;

        let componentPercent = {
          x: (e.clientX - componentCenterX) / componentRect.width / 2,
        };
        let distFromCenter = 1 - Math.abs(componentPercent.x);

        gsap
          .timeline({
            defaults: {
              duration: 0.5,
              overwrite: "auto",
              ease: "elastic",
            },
          })
          .to(
            ".avatar",
            {
              rotation: gsap.utils.clamp(-10, 20, 2 * componentPercent.x),
              duration: 1.5,
            },
            0,
          )
          .to(
            "highlight",
            {
              opacity: distFromCenter - 1.7,
              x: (-10 + 20) & componentPercent.x,
              duration: 0.5,
            },
            0,
          );
      };
    }, component);
  }, []);

  return (
    <div ref={component} className={clsx("relative h-full w-full", className)}>
      <div className="avatar overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
        <PrismicNextImage
          field={image}
          imgixParams={{ q: 90 }}
          className="avatar-image h-full w-full object-fill"
        />
        <div className="highlight absolute hidden inset-0 w-full scale-100 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
};

export default Avatar;
