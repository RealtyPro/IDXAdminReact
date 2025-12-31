"use client";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { useBlogList } from "@/services/blog/BlogQueris";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from '@tanstack/react-query';
import { deleteBlog } from "@/services/blog/BlogServices";
import { Blog } from "../../types/Blog";
export default function BlogListPage() {

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const queryClient = useQueryClient();
  const { data: blogListDatas, isLoading, error } = useBlogList(currentPage);


  useEffect(() => {
    // setBlogs(mockBlogs);
    setLoading(false);

  }, []);
  const removeBlogMutation = useMutation({
    mutationFn: (id: string) => deleteBlog(id),

    onSuccess: (data) => {
      alert("Blog deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['bloglist'] });
    },
    onError: (error) => {
      console.error("Error  while deletion:", error);
    },
  });
  useEffect(() => {
    if (blogListDatas && !isLoading && !error) {
      // setBlogs(blogListDatas);
      setBlogs(blogListDatas.data);
      setCurrentPage(blogListDatas.meta.current_page);
      setTotalPages(blogListDatas.meta.last_page);
      setTotal(blogListDatas.meta.total);
      setPerPage(blogListDatas.meta.per_page);
    }


  }, [blogListDatas, isLoading, error])
  useEffect(() => {
    if (currentPage) {
      queryClient.invalidateQueries({ queryKey: ['bloglist'] });

    }
  }, [currentPage]);
  if (isLoading) {
    return (
      <div className="contain-auto py-6 px-2 sm:px-4 spx-w-2xl">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-6">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }
  const handleDelete = (id: string) => {
    removeBlogMutation.mutate(id);
  }
  return (
    <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <div className="flex gap-2">
          <Button asChild variant="secondary">
            <Link href="/admin">Back</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/blog/create">New Blog Post</Link>
          </Button>
        </div>
      </div>
      {blogs.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">No blog posts found.</div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-lg">
                    <Link href={`/admin/blog/${blog.id}`}>{blog.title}</Link>
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {blog.subtitle && <div className="italic mb-1">{blog.subtitle}</div>}
                    <span>By {blog.author} on {blog.publishDate}</span>
                    <span className="mx-2">|</span>
                    <span>Category: {blog.category}</span>
                    <span className="mx-2">|</span>
                    <span>Status: {blog.status == "published" ? "Published" : "Unpublished"}</span>
                    {blog.isFeatured && <span className="ml-2 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-semibold">Featured</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/blog/${blog.id}/edit`}>Edit</Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(blog.id)}>Delete</Button>
                </div>

              </CardHeader>
            </Card>
          ))}
          <div className="flex items-center gap-4 mt-4">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="flex items-center px-3 py-1 bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-gray-300 transition rounded-md"
            >
              ← 
            </button>

            <span className="font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="flex items-center px-3 py-1 bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-gray-300 transition rounded-md"
            >
               →
            </button>
          </div>

        </div>
      )}
    </div>
  );
} 