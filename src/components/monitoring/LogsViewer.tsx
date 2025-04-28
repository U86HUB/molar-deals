
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bug, Download, Search } from "lucide-react";

interface Log {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  service: string;
  message: string;
  details?: string;
}

interface LogsViewerProps {
  logs: Log[];
}

export function LogsViewer({ logs }: LogsViewerProps) {
  const [filter, setFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  
  // Get unique services for filtering
  const uniqueServices = Array.from(new Set(logs.map(log => log.service)));
  
  // Apply filters
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(filter.toLowerCase()) || 
                          (log.details?.toLowerCase().includes(filter.toLowerCase()) ?? false);
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    const matchesService = serviceFilter === "all" || log.service === serviceFilter;
    
    return matchesSearch && matchesLevel && matchesService;
  });
  
  // Helper function to get badge variant based on log level
  const getLevelBadge = (level: string) => {
    const variants: Record<string, "default" | "outline" | "secondary" | "destructive"> = {
      info: "default",
      warn: "secondary",
      error: "destructive",
      debug: "outline"
    };
    
    return variants[level] || "default";
  };
  
  // Download logs as JSON
  const downloadLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "system_logs.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search logs..."
            className="pl-8"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Log Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warn">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {uniqueServices.map(service => (
                <SelectItem key={service} value={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" onClick={downloadLogs}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            System Logs
            <Badge variant="outline" className="ml-2">
              {filteredLogs.length} entries
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[500px] overflow-auto">
            {filteredLogs.length > 0 ? (
              <table className="w-full">
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-2 px-4 align-top text-xs text-muted-foreground w-32">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 align-top w-20">
                        <Badge variant={getLevelBadge(log.level)}>
                          {log.level}
                        </Badge>
                      </td>
                      <td className="py-2 px-4 align-top w-24">
                        <span className="text-xs font-medium">{log.service}</span>
                      </td>
                      <td className="py-2 px-4">
                        <div>
                          <div className="flex items-start gap-2">
                            {log.level === "error" && <Bug className="h-4 w-4 text-destructive mt-0.5" />}
                            <span>{log.message}</span>
                          </div>
                          {log.details && (
                            <div className="mt-1 text-xs text-muted-foreground whitespace-pre-wrap font-mono pl-6">
                              {log.details}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No logs match your current filters
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
