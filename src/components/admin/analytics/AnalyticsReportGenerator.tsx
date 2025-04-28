
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileSpreadsheet } from "lucide-react";

interface AnalyticsReportGeneratorProps {
  timeRange: string;
}

export const AnalyticsReportGenerator = ({ timeRange }: AnalyticsReportGeneratorProps) => {
  const [reportType, setReportType] = useState("deals");
  
  const reportOptions = [
    { value: "deals", label: "Deals Performance Report" },
    { value: "revenue", label: "Revenue Report" },
    { value: "vendors", label: "Vendor Performance Report" },
    { value: "users", label: "User Engagement Report" },
    { value: "categories", label: "Deal Categories Report" }
  ];
  
  // Mock data for a preview of what the exported report would contain
  const reportPreviewData = {
    deals: [
      { id: "D1", name: "Whitening Kit", vendor: "DentalBright", views: 982, clicks: 127, ctr: "12.9%" },
      { id: "D2", name: "Impression Material", vendor: "MoldMaster", views: 745, clicks: 86, ctr: "11.5%" },
      { id: "D3", name: "Composite Kit", vendor: "DentFill", views: 890, clicks: 103, ctr: "11.6%" },
      { id: "D4", name: "Practice Management", vendor: "DentalSoft", views: 612, clicks: 78, ctr: "12.7%" },
      { id: "D5", name: "Sterilization Unit", vendor: "MediClean", views: 543, clicks: 59, ctr: "10.9%" }
    ]
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="space-y-2 mb-4">
          <h2 className="text-xl font-semibold">Export Analytics Reports</h2>
          <p className="text-muted-foreground">Generate and download detailed reports based on the selected criteria</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              {reportOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deal ID</TableHead>
              <TableHead>Deal Name</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead className="text-right">CTR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportPreviewData.deals.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-mono">{deal.id}</TableCell>
                <TableCell>{deal.name}</TableCell>
                <TableCell>{deal.vendor}</TableCell>
                <TableCell className="text-right">{deal.views}</TableCell>
                <TableCell className="text-right">{deal.clicks}</TableCell>
                <TableCell className="text-right">{deal.ctr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="bg-muted/50 rounded-md p-3 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <FileSpreadsheet className="h-4 w-4 mt-0.5" />
          <div>
            <p>Reports are exported as CSV files that can be imported into Excel, Google Sheets, or other data analysis tools.</p>
            <p className="mt-1">Exported data will reflect the current time range filter ({timeRange}).</p>
          </div>
        </div>
      </div>
    </div>
  );
};
