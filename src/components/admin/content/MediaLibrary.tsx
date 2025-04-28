
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, Grid, LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "sonner";

// Mock media items
const mockMedia = [
  {
    id: "1",
    name: "dental-equipment.jpg",
    type: "image",
    size: "1.2 MB",
    dimensions: "1200 x 800",
    uploadedAt: "Apr 15, 2025",
    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=500",
  },
  {
    id: "2",
    name: "patient-guide.pdf",
    type: "document",
    size: "2.5 MB",
    dimensions: "N/A",
    uploadedAt: "Apr 10, 2025",
    url: "",
  },
  {
    id: "3",
    name: "dental-clinic.jpg",
    type: "image",
    size: "800 KB",
    dimensions: "2000 x 1200",
    uploadedAt: "Apr 8, 2025",
    url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=500",
  },
  {
    id: "4",
    name: "whitening-procedure.jpg",
    type: "image",
    size: "1.7 MB",
    dimensions: "1600 x 900",
    uploadedAt: "Apr 5, 2025",
    url: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?q=80&w=500",
  },
  {
    id: "5",
    name: "product-demo.mp4",
    type: "video",
    size: "12.4 MB",
    dimensions: "1920 x 1080",
    uploadedAt: "Apr 1, 2025",
    url: "",
  },
  {
    id: "6",
    name: "dental-implant.jpg",
    type: "image",
    size: "950 KB",
    dimensions: "1800 x 1200",
    uploadedAt: "Mar 28, 2025",
    url: "https://images.unsplash.com/photo-1609840112990-4265448268d1?q=80&w=500",
  },
];

// Helper to render a file icon based on file type
const FileIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "image":
      return <div className="h-4 w-4 text-blue-500">📷</div>;
    case "video":
      return <div className="h-4 w-4 text-red-500">🎬</div>;
    case "document":
      return <div className="h-4 w-4 text-green-500">📄</div>;
    default:
      return <div className="h-4 w-4 text-gray-500">📁</div>;
  }
};

export const MediaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [media, setMedia] = useState(mockMedia);

  const filteredMedia = media.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpload = () => {
    toast.info("Upload functionality would open a file picker dialog");
    // In a real implementation, this would trigger a file upload dialog
  };

  const handleMediaSelect = (mediaItem: typeof media[0]) => {
    toast.success(`Selected: ${mediaItem.name}`);
  };

  const handleMediaDelete = (id: string) => {
    setMedia(media.filter((item) => item.id !== id));
    toast.success("Media item deleted");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Grid className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Media Library</h3>
        </div>
        <div className="flex gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-none border-r h-9",
                viewMode === "grid" && "bg-muted"
              )}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-none h-9",
                viewMode === "list" && "bg-muted"
              )}
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleUpload} className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search media..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredMedia.length > 0 ? (
        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : "flex flex-col space-y-2"
          )}
        >
          {filteredMedia.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "overflow-hidden transition-all",
                viewMode === "list" && "flex flex-row items-center"
              )}
            >
              {item.type === "image" ? (
                <div
                  className={cn(
                    "relative cursor-pointer group",
                    viewMode === "list" ? "w-16 h-16" : "w-full"
                  )}
                  onClick={() => handleMediaSelect(item)}
                >
                  <AspectRatio ratio={viewMode === "list" ? 1 : 4 / 3}>
                    <img
                      src={item.url}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white bg-opacity-90"
                    >
                      Select
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    "relative cursor-pointer flex items-center justify-center bg-muted text-muted-foreground",
                    viewMode === "list" ? "w-16 h-16" : "h-[150px] w-full"
                  )}
                  onClick={() => handleMediaSelect(item)}
                >
                  <FileIcon type={item.type} />
                  {viewMode !== "list" && (
                    <span className="text-sm mt-2">{item.type}</span>
                  )}
                </div>
              )}

              <div
                className={cn(
                  viewMode === "list" ? "flex-1 p-4" : "p-3"
                )}
              >
                <div className="flex justify-between items-start">
                  <div className={viewMode === "list" ? "flex-1" : ""}>
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <div className={cn("flex text-xs text-muted-foreground", viewMode === "list" ? "gap-2" : "flex-col")}>
                      <span>{item.size}</span>
                      {viewMode === "list" && <span>•</span>}
                      <span>{item.uploadedAt}</span>
                    </div>
                  </div>
                  {viewMode === "list" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMediaDelete(item.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>

              {viewMode !== "list" && (
                <CardFooter className="p-3 pt-0 flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    {item.dimensions}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMediaDelete(item.id)}
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">
            No media files found. Try adjusting your search or upload new files.
          </p>
        </div>
      )}
    </div>
  );
};
