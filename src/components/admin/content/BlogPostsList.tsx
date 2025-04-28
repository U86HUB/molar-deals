import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreVertical, Edit, Eye, Trash, FileText } from "lucide-react";
import { format } from "date-fns";
import { BlogPostDialog } from "@/components/admin/content/BlogPostDialog";
import { toast } from "sonner";

// Mock data for blog posts
const mockPosts = [
  {
    id: "1",
    title: "Top 10 Dental Hygiene Tips for 2025",
    status: "published",
    author: "Dr. Smith",
    category: "Oral Health",
    publishedAt: new Date(2025, 3, 15),
    views: 1245,
  },
  {
    id: "2",
    title: "The Future of Dental Technology",
    status: "draft",
    author: "Jane Cooper",
    category: "Technology",
    publishedAt: null,
    views: 0,
  },
  {
    id: "3",
    title: "How to Choose the Right Dental Equipment",
    status: "published",
    author: "Dr. Wilson",
    category: "Equipment",
    publishedAt: new Date(2025, 2, 28),
    views: 832,
  },
  {
    id: "4",
    title: "Dental Insurance: What You Need to Know",
    status: "archived",
    author: "Emma Thompson",
    category: "Insurance",
    publishedAt: new Date(2025, 1, 10),
    views: 2156,
  },
  {
    id: "5",
    title: "Digital Dentistry: A Comprehensive Guide",
    status: "draft",
    author: "Dr. Martinez",
    category: "Technology",
    publishedAt: null,
    views: 0,
  },
];

// Update status colors to use valid Badge variants
const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  published: "default",
  draft: "secondary",
  archived: "outline",
};

export const BlogPostsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState(mockPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<typeof mockPosts[0] | null>(null);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePost = () => {
    setEditingPost(null);
    setIsDialogOpen(true);
  };

  const handleEditPost = (post: typeof mockPosts[0]) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const handleViewPost = (post: typeof mockPosts[0]) => {
    toast.info(`Viewing post: ${post.title}`);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId));
    toast.success("Post deleted successfully");
  };

  const handleSavePost = (post: typeof mockPosts[0]) => {
    if (editingPost) {
      setPosts(posts.map((p) => (p.id === post.id ? post : p)));
      toast.success("Post updated successfully");
    } else {
      setPosts([...posts, { ...post, id: (posts.length + 1).toString() }]);
      toast.success("Post created successfully");
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Blog Posts</h3>
          <Badge variant="secondary" className="ml-2">
            {posts.length}
          </Badge>
        </div>
        <Button onClick={handleCreatePost} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Create Post</span>
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[post.status as keyof typeof statusColors]}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    {post.publishedAt
                      ? format(post.publishedAt, "MMM d, yyyy")
                      : "—"}
                  </TableCell>
                  <TableCell>{post.views.toLocaleString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 data-[state=open]:bg-muted"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditPost(post)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewPost(post)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No posts found. Try adjusting your search or create a new post.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <BlogPostDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialPost={editingPost}
        onSave={handleSavePost}
      />
    </div>
  );
};
