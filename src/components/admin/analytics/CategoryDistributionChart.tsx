
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface CategoryDistributionChartProps {
  timeRange: string;
}

export const CategoryDistributionChart = ({ timeRange }: CategoryDistributionChartProps) => {
  // Mock data - in a real app this would be fetched based on timeRange
  const categoryData = [
    { name: 'Equipment', value: 35, color: '#8b5cf6' },
    { name: 'Consumables', value: 25, color: '#6366f1' },
    { name: 'Instruments', value: 20, color: '#d946ef' },
    { name: 'Software', value: 10, color: '#0ea5e9' },
    { name: 'Services', value: 10, color: '#f97316' }
  ];
  
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
