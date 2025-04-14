
import type { DealProps } from "@/components/deals/DealCard";

export const mockDeals: DealProps[] = [
  {
    id: "1",
    title: "50% Off Professional Teeth Whitening Kit",
    description: "Get our professional-grade teeth whitening kit at half price. Includes LED accelerator and 3 whitening gel syringes.",
    brandName: "BrightSmile",
    brandLogo: "",
    discountValue: "50%",
    category: "Patient Care Products",
    expiryDate: "2025-06-15",
    isPremium: false,
    isNew: true,
    url: "https://example.com/deal/1",
    country: "USA"
  },
  {
    id: "2",
    title: "Buy One Get One Free: Premium Dental Impression Material",
    description: "Purchase our premium alginate impression material and get a second package free. Ideal for precise and detailed impressions.",
    brandName: "DentImpression",
    brandLogo: "",
    discountValue: "BOGO",
    category: "Dental Materials",
    expiryDate: "2025-05-20",
    isPremium: false,
    url: "https://example.com/deal/2",
    country: "GLOBAL"
  },
  {
    id: "3",
    title: "Exclusive: 35% Off Advanced Dental Laser System",
    description: "Take advantage of this limited-time offer on our state-of-the-art dental laser system. Includes free installation and 2-day training.",
    brandName: "LaserDent",
    brandLogo: "",
    discountValue: "35%",
    category: "Equipment",
    expiryDate: "2025-05-30",
    isPremium: true,
    url: "https://example.com/deal/3",
    country: "UK"
  },
  {
    id: "4",
    title: "Free Trial: Cloud-Based Practice Management Software",
    description: "Try our comprehensive dental practice management software free for 3 months. Includes patient records, billing, and appointment scheduling.",
    brandName: "DentCloud",
    brandLogo: "",
    discountValue: "Free Trial",
    category: "Software",
    expiryDate: "2025-07-01",
    isPremium: false,
    url: "https://example.com/deal/4",
    country: "GLOBAL"
  },
  {
    id: "5",
    title: "20% Off Continuing Education Courses",
    description: "Expand your knowledge with our accredited online dental continuing education courses at a special discount.",
    brandName: "DentalEdu",
    brandLogo: "",
    discountValue: "20%",
    category: "Continuing Education",
    expiryDate: "2025-06-10",
    isPremium: true,
    url: "https://example.com/deal/5",
    country: "CAN"
  },
  {
    id: "6",
    title: "Special Bundle: Complete Orthodontic Kit",
    description: "Get our complete orthodontic starter kit including pliers, brackets, and wires at a bundled discount price.",
    brandName: "OrthoSupply",
    brandLogo: "",
    discountValue: "30%",
    category: "Orthodontic Products",
    expiryDate: "2025-05-25",
    isPremium: false,
    isNew: true,
    url: "https://example.com/deal/6",
    country: "AUS"
  }
];
