
export type Region = {
  id: string;
  name: string;
  countries: Country[];
};

export type Country = {
  code: string;
  name: string;
};

// Global option (always at the top)
export const globalOption: Region = {
  id: "global",
  name: "Global (All Countries)",
  countries: []
};

// Region definitions with their member countries
export const regions: Region[] = [
  {
    id: "north_america",
    name: "North America",
    countries: [
      { code: "USA", name: "United States" },
      { code: "CAN", name: "Canada" },
      { code: "MEX", name: "Mexico" }
    ]
  },
  {
    id: "europe",
    name: "Europe",
    countries: [
      { code: "UK", name: "United Kingdom" },
      { code: "DEU", name: "Germany" },
      { code: "FRA", name: "France" },
      { code: "ESP", name: "Spain" },
      { code: "ITA", name: "Italy" },
      { code: "NLD", name: "Netherlands" },
      { code: "BEL", name: "Belgium" },
      { code: "SWE", name: "Sweden" },
      { code: "NOR", name: "Norway" },
      { code: "DNK", name: "Denmark" },
      { code: "FIN", name: "Finland" },
      { code: "IRL", name: "Ireland" },
      { code: "PRT", name: "Portugal" },
      { code: "GRC", name: "Greece" },
      { code: "AUT", name: "Austria" },
      { code: "CHE", name: "Switzerland" }
    ]
  },
  {
    id: "asia_pacific",
    name: "Asia & Pacific",
    countries: [
      { code: "JPN", name: "Japan" },
      { code: "CHN", name: "China" },
      { code: "IND", name: "India" },
      { code: "AUS", name: "Australia" },
      { code: "NZL", name: "New Zealand" },
      { code: "SGP", name: "Singapore" },
      { code: "KOR", name: "South Korea" },
      { code: "MYS", name: "Malaysia" },
      { code: "THA", name: "Thailand" },
      { code: "PHL", name: "Philippines" },
      { code: "IDN", name: "Indonesia" }
    ]
  },
  {
    id: "latin_america",
    name: "Latin America",
    countries: [
      { code: "BRA", name: "Brazil" },
      { code: "ARG", name: "Argentina" },
      { code: "CHL", name: "Chile" },
      { code: "COL", name: "Colombia" },
      { code: "PER", name: "Peru" },
      { code: "VEN", name: "Venezuela" }
    ]
  },
  {
    id: "middle_east_africa",
    name: "Middle East & Africa",
    countries: [
      { code: "ZAF", name: "South Africa" },
      { code: "EGY", name: "Egypt" },
      { code: "NGA", name: "Nigeria" },
      { code: "SAU", name: "Saudi Arabia" },
      { code: "ARE", name: "United Arab Emirates" },
      { code: "ISR", name: "Israel" }
    ]
  }
];

// Function to get all countries as a flat array
export const getAllCountries = (): Country[] => {
  return regions.flatMap(region => region.countries);
};

// Function to get a country by its code
export const getCountryByCode = (code: string): Country | undefined => {
  return getAllCountries().find(country => country.code === code);
};

// Function to get a region by its ID
export const getRegionById = (id: string): Region | undefined => {
  return regions.find(region => region.id === id);
};

// Function to find which region a country belongs to
export const findCountryRegion = (countryCode: string): Region | undefined => {
  return regions.find(region => 
    region.countries.some(country => country.code === countryCode)
  );
};
