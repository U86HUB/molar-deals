
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Eye, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock static pages data
const mockPages = [
  {
    id: "1",
    title: "About Us",
    slug: "about-us",
    lastUpdated: "Apr 15, 2025",
    status: "published",
    content: "DentalDeals is a platform connecting dental professionals with exclusive deals on equipment and supplies.",
  },
  {
    id: "2",
    title: "Contact Us",
    slug: "contact-us",
    lastUpdated: "Apr 10, 2025",
    status: "published",
    content: "Get in touch with our team for any questions or support needs.",
  },
  {
    id: "3",
    title: "Terms and Conditions",
    slug: "terms-and-conditions",
    lastUpdated: "Apr 5, 2025",
    status: "published",
    content: "Please read these terms and conditions carefully before using our service.",
  },
  {
    id: "4",
    title: "FAQs",
    slug: "faqs",
    lastUpdated: "Mar 30, 2025",
    status: "draft",
    content: "Frequently asked questions about our platform and services.",
  },
];

export const PageEditor = () => {
  const [selectedTab, setSelectedTab] = useState("pages-list");
  const [pages, setPages] = useState(mockPages);
  const [selectedPage, setSelectedPage] = useState<typeof mockPages[0] | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published");

  const handlePageSelect = (page: typeof mockPages[0]) => {
    setSelectedPage(page);
    setTitle(page.title);
    setSlug(page.slug);
    setContent(page.content);
    setStatus(page.status);
    setSelectedTab("editor");
  };

  const handleCreateNew = () => {
    setSelectedPage(null);
    setTitle("");
    setSlug("");
    setContent("");
    setStatus("draft");
    setSelectedTab("editor");
  };

  const handleSave = () => {
    if (!title || !slug || !content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedPage = {
      id: selectedPage?.id || (pages.length + 1).toString(),
      title,
      slug,
      content,
      status,
      lastUpdated: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    if (selectedPage) {
      // Update existing page
      setPages(pages.map((p) => (p.id === selectedPage.id ? updatedPage : p)));
      toast.success("Page updated successfully");
    } else {
      // Create new page
      setPages([...pages, updatedPage]);
      toast.success("Page created successfully");
    }

    setSelectedTab("pages-list");
  };

  const handlePreview = () => {
    toast.info("Preview functionality would show the page as it would appear on the site");
  };

  const handleDelete = (pageId: string) => {
    setPages(pages.filter((page) => page.id !== pageId));
    toast.success("Page deleted successfully");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = e.target.value;
    setTitle(titleValue);
    
    // Auto-generate slug if there's no custom slug yet
    if (!selectedPage) {
      const autoSlug = titleValue
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      setSlug(autoSlug);
    }
  };

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Static Pages</h3>
        </div>
        <div className="flex gap-2">
          <TabsList>
            <TabsTrigger value="pages-list">Pages List</TabsTrigger>
            <TabsTrigger value="editor">Page Editor</TabsTrigger>
          </TabsList>
          {selectedTab === "pages-list" && (
            <Button onClick={handleCreateNew}>Create New Page</Button>
          )}
        </div>
      </div>

      <TabsContent value="pages-list">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>/{page.slug}</TableCell>
                    <TableCell>{page.lastUpdated}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          page.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {page.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePageSelect(page)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(page.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="editor">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter page title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">/</span>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                      placeholder="page-url-slug"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={handlePreview}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button 
                    onClick={handleSave}
                    className="flex items-center gap-1"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Page Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter page content here..."
                className="min-h-[300px]"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
