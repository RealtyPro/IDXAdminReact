"use client";
import React from 'react';
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import 'react-quill-new/dist/quill.snow.css';
import { useSingleBlog, useUpdateBlog } from '@/services/blog/BlogQueris';
import { Blog } from '@/app/types/Blog';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
export default function BlogEditPage() {

  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const [image, setImage] = useState<string | null>(null);  
  const [loading, setLoading] = useState(true);
  const params = useParams();
  // const { data: singleBlog, isLoading, error} = useSingleBlog({ id: params.id as string });
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: singleBlog, isLoading, error} = useSingleBlog(params.id as string);
  const { mutateAsync: updateBlog } = useUpdateBlog(params.id as string);
  //  const postBlogMutation = useMutation({
  //     mutationFn: (newBlog: any) => postNewBlog(newBlog),
  
  //     onSuccess: (data) => {
  //       console.log("blog posted successfully:", data);
  //       window.location.href="/admin/blog";
  
  //     },
  //     onError: (error) => {
  //       console.error("Error  while creating new blog:", error);
  //     },
  //   });
  useEffect(() => {
    
    const found = singleBlog?.data;
   
    if (found) {
       setBlog(found);
    }
    setLoading(isLoading);
  }, [singleBlog?.data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6 max-w-xl">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl mt-4" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6 max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Blog Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">The blog post you are looking for does not exist.</div>
            <Button asChild variant="secondary" className="mt-4">
              <Link href="/admin/blog">Back to Blog List</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to update the blog
    // const updated =updateBlog(blog);

    // console.log("Blog updated successfully:", updated);
    // alert(`Blog updated: ${blog.title}`);
    handleSave(blog);
  };
  const handleSave = async (newValues:any) => {
  try {
    await updateBlog(newValues, {
      onSuccess: (data) => {
        // e.g., show a toast or navigate somewhere

        window.location.href = `/admin/blog`;
      },
      onError: (error) => {
        console.error('Failed to update the blog!', error);
        // e.g., show an error toast
      }
    });
  } catch (error) {
    // fallback if onError wasn't provided
    console.error('Error occurred!', error);
  }
  }
  return (
    <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6 max-w-xl">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Edit Blog Post</CardTitle>
          <Button asChild variant="secondary" size="sm">
            <Link href={`/admin/blog/${blog.id}`}>Back</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={blog.title} onChange={e => setBlog({...blog,title:e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input id="subtitle" value={blog.subtitle} onChange={e => setBlog({...blog,subtitle:e.target.value})} />
            </div>
            {/* <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" value={blog.category} onChange={e => setBlog({...blog,category:e.target.value})} />
            </div> */}
              <div>
                          <Label htmlFor="category">Category</Label>
                          <select
                            id="category"
                            value={blog.category}
                            onChange={(e) => setBlog({...blog,category:e.target.value})}
                            className="block w-full text-sm border-gray-300 rounded-md"
                            required
                          >
                            <option value="">Select a category</option>
                            <option value="blog">Blog</option>
                            <option value="news">News</option>
                            <option value="articles">Articles</option>
                          </select>
                        </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={blog.publishDate} onChange={e => setBlog({...blog,publishDate:e.target.value})} />
            </div>
            <div className="flex items-center gap-2">
              <input id="isFeatured" type="checkbox" checked={blog.is_featured} onChange={e => setBlog({...blog,is_featured:e.target.checked})} />
              <Label htmlFor="isFeatured">Featured</Label>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select id="status" value={blog.status} onChange={e => setBlog({...blog,status:e.target.value})} className="px-4 py-2 rounded-lg border border-input bg-background text-sm">
                {/* <option value=""></option> */}
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <ReactQuill theme="snow" value={blog.content} onChange={e => setBlog({...blog,content:e})} className="bg-white" />
            </div>
            <Button type="submit">Update Blog</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 