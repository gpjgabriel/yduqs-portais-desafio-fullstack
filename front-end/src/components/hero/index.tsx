import React from "react";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export const HeroSection = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section className="w-full bg-[#144BC8] text-white">
      <div
        className="
          container mx-auto max-w-7xl flex flex-col 
          items-start gap-4 py-10 px-6 md:px-4
        "
      >
        <div className="flex w-full flex-col items-start gap-2">
          <h1
            className="
            font-medium text-2xl 
            md:text-[32px] md:leading-[1.2]
          "
          >
            {title}
          </h1>
          <p
            className="
            font-normal text-base leading-6
            text-blue-100
          "
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};
