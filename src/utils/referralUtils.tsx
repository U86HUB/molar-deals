
import { Trophy, Medal } from "lucide-react";
import { ReactNode } from "react";

export interface ReferrerType {
  id: number;
  name: string;
  regularReferrals: number;
  premiumReferrals: number;
  bonusPoints: number;
  conversionRate: number;
  joinedDate: string;
  earnings: number;
}

export const getMedalIcon = (rank: number): ReactNode => {
  if (rank === 1) return <Trophy className="h-6 w-6 text-amber-500" />;
  if (rank === 2) return <Medal className="h-6 w-6 text-zinc-400" />;
  if (rank === 3) return <Medal className="h-6 w-6 text-amber-700" />;
  return null;
};

// Calculate weighted score based on the formula: Score = (R×1)+(P×2)+B
export const calculateReferralScore = (referrer: ReferrerType): number => {
  return (
    referrer.regularReferrals * 1 + 
    referrer.premiumReferrals * 2 + 
    referrer.bonusPoints
  );
};

// Generate mock data with regular and premium referrals
export const generateMockReferrers = (): ReferrerType[] => {
  return Array.from({ length: 50 }, (_, i) => {
    const regularReferrals = Math.floor(Math.random() * 30) + 1;
    const premiumReferrals = Math.floor(Math.random() * 15);
    const bonusPoints = Math.floor(Math.random() * 10);
    
    return {
      id: i + 1,
      name: `Dr. ${['Sarah', 'John', 'Michael', 'Emma', 'Robert', 'Lisa', 'David', 'Jessica', 'Thomas', 'Maria'][i % 10]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'][i % 10]}`,
      regularReferrals,
      premiumReferrals,
      bonusPoints,
      conversionRate: Math.floor(Math.random() * 100) + 1,
      joinedDate: new Date(2024, Math.floor(Math.random() * 4), Math.floor(Math.random() * 30) + 1).toLocaleDateString(),
      earnings: (regularReferrals * 10) + (premiumReferrals * 25) // $10 per regular, $25 per premium
    };
  }).sort((a, b) => calculateReferralScore(b) - calculateReferralScore(a)); // Sort by weighted score
};
