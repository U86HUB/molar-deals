
import { FC } from "react";

interface OurStorySectionProps {}

const OurStorySection: FC<OurStorySectionProps> = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              DentalDeals was born out of frustration. Our founders, both dental professionals, were tired of the high markups and lack of transparency in dental supply pricing.
            </p>
            <p className="text-gray-600 mb-4">
              In 2023, we set out to create a platform that would level the playing field for dental professionals – giving them access to wholesale pricing and exclusive deals typically reserved for large dental service organizations.
            </p>
            <p className="text-gray-600">
              Today, DentalDeals partners with over 140 brands to bring significant savings to thousands of dental professionals across the country.
            </p>
          </div>
          <div className="md:w-1/2 bg-white rounded-xl overflow-hidden shadow-md">
            <div className="h-64 bg-gray-100 flex items-center justify-center p-4">
              <div className="text-xl font-semibold text-gray-500">Our Team Photo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
