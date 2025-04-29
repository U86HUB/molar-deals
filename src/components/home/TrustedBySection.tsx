
export const TrustedBySection = () => {
  return (
    <section className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground mb-8">
          Trusted by thousands of dental professionals and brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {['DentistBrand', 'ToothCare', 'OralTech', 'SmileCorp', 'DentalEquip'].map((brand) => (
            <div key={brand} className="text-gray-400 font-semibold text-xl">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
