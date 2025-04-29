
import { FC } from "react";

interface AboutHeroProps {}

const AboutHero: FC<AboutHeroProps> = () => {
  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About DentalDeals</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          We're on a mission to make dental supplies and equipment more affordable for dental professionals everywhere.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
