
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Server, ServerCrash } from "lucide-react";

interface Service {
  id: string;
  name: string;
  status: "operational" | "degraded" | "down";
  isEssential: boolean;
  latency: number;
}

interface Endpoint {
  id: string;
  path: string;
  method: string;
  success: number;
  failed: number;
  avgResponseTime: number;
  lastChecked: string;
}

interface ApiHealthStatusProps {
  services: Service[];
  endpoints: Endpoint[];
}

export function ApiHealthStatus({ services, endpoints }: ApiHealthStatusProps) {
  // Helper function to render status badge
  const renderStatusBadge = (status: "operational" | "degraded" | "down") => {
    const variants: Record<string, "default" | "outline" | "secondary" | "destructive"> = {
      operational: "default",
      degraded: "secondary",
      down: "destructive",
    };
    
    const labels: Record<string, string> = {
      operational: "Operational",
      degraded: "Degraded Performance",
      down: "Service Disruption",
    };
    
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Core Services</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base font-medium">{service.name}</CardTitle>
                  <CardDescription>
                    {service.isEssential ? "Essential Service" : "Supporting Service"}
                  </CardDescription>
                </div>
                {service.status === "operational" ? (
                  <Server className="h-5 w-5 text-green-500" />
                ) : (
                  <ServerCrash className="h-5 w-5 text-red-500" />
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Latency</div>
                    <div className="text-lg">{service.latency} ms</div>
                  </div>
                  <div>{renderStatusBadge(service.status)}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-3">API Endpoints</h3>
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Endpoint</th>
                  <th className="text-center py-3 px-4">Method</th>
                  <th className="text-center py-3 px-4">Success Rate</th>
                  <th className="text-center py-3 px-4">Avg Response</th>
                  <th className="text-center py-3 px-4">Last Check</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((endpoint) => {
                  const total = endpoint.success + endpoint.failed;
                  const successRate = total ? ((endpoint.success / total) * 100).toFixed(1) : "N/A";
                  
                  return (
                    <tr key={endpoint.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4 font-mono text-sm">{endpoint.path}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="outline" className="font-mono">
                          {endpoint.method}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={
                          parseFloat(successRate as string) > 95
                            ? "text-green-500"
                            : parseFloat(successRate as string) > 80
                            ? "text-amber-500"
                            : "text-red-500"
                        }>
                          {successRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{endpoint.avgResponseTime} ms</td>
                      <td className="py-3 px-4 text-center text-sm text-muted-foreground">
                        {new Date(endpoint.lastChecked).toLocaleTimeString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
