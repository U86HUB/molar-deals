
export interface VendorDeal {
  id: string;
  title: string;
  description: string;
  status: "active" | "pending" | "expired";
  views: number;
  clicks: number;
  category: string;
  expiryDate: string;
  isPremium: boolean;
  isNew?: boolean;
  country: string;
}

// Mock vendor deals
export const mockVendorDeals: VendorDeal[] = [
  {
    id: "v1",
    title: "50% Off Professional Teeth Whitening Kit",
    description: "Get our professional-grade teeth whitening kit at half price. Includes LED accelerator and 3 whitening gel syringes.",
    status: "active",
    views: 486,
    clicks: 58,
    category: "Patient Care Products",
    expiryDate: "2025-06-15",
    isPremium: false,
    isNew: true,
    country: "USA"
  },
  {
    id: "v2",
    title: "Buy One Get One Free: Premium Dental Impression Material",
    description: "Purchase our premium alginate impression material and get a second package free. Ideal for precise and detailed impressions.",
    status: "active",
    views: 324,
    clicks: 41,
    category: "Dental Materials",
    expiryDate: "2025-05-20",
    isPremium: false,
    country: "GLOBAL"
  },
  {
    id: "v3",
    title: "Exclusive: 35% Off Advanced Dental Laser System",
    description: "Take advantage of this limited-time offer on our state-of-the-art dental laser system. Includes free installation and 2-day training.",
    status: "pending",
    views: 0,
    clicks: 0,
    category: "Equipment",
    expiryDate: "2025-05-30",
    isPremium: true,
    country: "UK"
  },
  {
    id: "v4",
    title: "Free Trial: Cloud-Based Practice Management Software",
    description: "Try our comprehensive dental practice management software free for 3 months. Includes patient records, billing, and appointment scheduling.",
    status: "active",
    views: 438,
    clicks: 72,
    category: "Software",
    expiryDate: "2025-07-01",
    isPremium: false,
    country: "GLOBAL"
  }
];
