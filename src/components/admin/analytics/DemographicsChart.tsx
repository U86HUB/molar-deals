
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer
} from "recharts";

interface DemographicsChartProps {
  timeRange: string;
}

export const DemographicsChart = ({ timeRange }: DemographicsChartProps) => {
  // Mock data - in a real app this would be fetched based on timeRange
  const userDemographics = [
    { subject: 'Dentists', A: 80, B: 65, fullMark: 100 },
    { subject: 'Specialists', A: 60, B: 45, fullMark: 100 },
    { subject: 'Hygienists', A: 30, B: 20, fullMark: 100 },
    { subject: 'Students', A: 50, B: 38, fullMark: 100 },
    { subject: 'Clinics', A: 65, B: 51, fullMark: 100 }
  ];
  
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={userDemographics}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar 
            name="Current Period" 
            dataKey="A" 
            stroke="#8b5cf6" 
            fill="#8b5cf6" 
            fillOpacity={0.6} 
          />
          <Radar 
            name="Previous Period" 
            dataKey="B" 
            stroke="#6366f1" 
            fill="#6366f1" 
            fillOpacity={0.3} 
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
