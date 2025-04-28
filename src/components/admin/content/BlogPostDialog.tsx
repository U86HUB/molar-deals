
import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText } from "lucide-react";

interface BlogPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialPost: any | null;
  onSave: (post: any) => void;
}

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(100),
  content: z.string().min(10, "Content must be at least 10 characters"),
  status: z.enum(["published", "draft", "archived"]),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  publishedAt: z.date().nullable(),
  views: z.number().default(0),
});

export const BlogPostDialog: React.FC<BlogPostDialogProps> = ({
  open,
  onOpenChange,
  initialPost,
  onSave,
}) => {
  const isEditing = !!initialPost;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: initialPost?.id || "",
      title: initialPost?.title || "",
      content: initialPost?.content || "",
      status: initialPost?.status || "draft",
      author: initialPost?.author || "",
      category: initialPost?.category || "",
      publishedAt: initialPost?.publishedAt || null,
      views: initialPost?.views || 0,
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        id: initialPost?.id || "",
        title: initialPost?.title || "",
        content: initialPost?.content || "",
        status: initialPost?.status || "draft",
        author: initialPost?.author || "",
        category: initialPost?.category || "",
        publishedAt: initialPost?.publishedAt || null,
        views: initialPost?.views || 0,
      });
    }
  }, [open, initialPost, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // If status changes to published, set publishedAt to current date
    if (data.status === "published" && !data.publishedAt) {
      data.publishedAt = new Date();
    }
    
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Make changes to the existing blog post."
              : "Fill out the form to create a new blog post."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your post content here..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Oral Health">Oral Health</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Equipment">Equipment</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                        <SelectItem value="Practice Management">
                          Practice Management
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select post status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {field.value === "published"
                      ? "This post will be visible to all users."
                      : field.value === "draft"
                      ? "This post is a work in progress and not visible."
                      : "This post is archived and not visible."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
