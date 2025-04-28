
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { BlogPostsList } from "@/components/admin/content/BlogPostsList";
import { MediaLibrary } from "@/components/admin/content/MediaLibrary";
import { PageEditor } from "@/components/admin/content/PageEditor";

const ContentManagementTab = () => {
  const [activeTab, setActiveTab] = useState("blog-posts");

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
          <p className="text-muted-foreground mt-2">
            Manage blog posts, pages, and media library for your dental deals platform.
          </p>
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Content Management System</AlertTitle>
        <AlertDescription>
          Create and publish content to engage your users and improve SEO. All content 
          is automatically optimized for search engines.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full md:w-auto grid grid-cols-3 mb-4">
          <TabsTrigger value="blog-posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="pages">Static Pages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blog-posts" className="space-y-4">
          <BlogPostsList />
        </TabsContent>
        
        <TabsContent value="media" className="space-y-4">
          <MediaLibrary />
        </TabsContent>
        
        <TabsContent value="pages" className="space-y-4">
          <PageEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagementTab;
