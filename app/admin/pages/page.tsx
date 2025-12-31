"use client";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { usePageList } from "@/services/page/PageQueris";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePage } from "@/services/page/PageServices";
import { Page } from "../../types/Page";

export default function PageListPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data: pageListDatas, isLoading, error } = usePageList(currentPage);

  const removePageMutation = useMutation({
    mutationFn: (id: string) => deletePage(id),
    onSuccess: (data) => {
      alert("Page deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['pagelist'] });
    },
    onError: (error) => {
      console.error("Error while deleting:", error);
    },
  });
  useEffect(() => {
    if (currentPage) {
      queryClient.invalidateQueries({ queryKey: ['testimonialslist'] });

    }
  }, [currentPage]);
  useEffect(() => {
    if (pageListDatas && !isLoading && !error) {
      setPages(pageListDatas.data);
      setCurrentPage(pageListDatas.meta.current_page);
      setTotalPages(pageListDatas.meta.last_page);

    }
  }, [pageListDatas, isLoading, error]);

  const handleDelete = (id: string) => {
    removePageMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6">
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

  return (
    <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pages</h1>
        <div className="flex gap-2">
          <Button asChild variant="secondary">
            <Link href="/admin">Back</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/pages/create">Add Page</Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-4">
        {pages.map((p) => (
          <Card key={p.id}>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-lg">
                  <Link href={`/admin/pages/${p.id}`}>{p.title}</Link>
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {p.slug} • {p.date}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {p.heading && <span>Heading: {p.heading} • </span>}
                  {p.meta_title && <span>Meta: {p.meta_title}</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/pages/${p.id}/edit`}>Edit</Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
              </div>
            </CardHeader>
            {p.banner && (
              <CardContent>
                <img src={p.banner} alt="Banner" className="max-h-24 rounded" />
              </CardContent>
            )}
          </Card>
        ))}

      </div>
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
  );
}