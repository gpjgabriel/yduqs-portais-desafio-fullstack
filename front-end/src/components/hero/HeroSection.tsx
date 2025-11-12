import React from "react";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export const HeroSection = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section className="w-full bg-[#144BC8] text-white">
      <div className="flex flex-col items-start gap-4 py-6 px-4 md:py-10 md:px-22 md:p-10">
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
