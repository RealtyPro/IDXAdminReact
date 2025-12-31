"use client";
import React from 'react';
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useTestimonialsList } from "@/services/testimonials/TestimonialsQueris";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from '@tanstack/react-query';
import { deleteTestimonials } from "@/services/testimonials/TestimonialsServices";
import { Testimonials } from "../../types/Testimonials";
export default function TestimonialsListPage() {

  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const { data: testimonialsListDatas, isLoading, error } = useTestimonialsList(currentPage);

  useEffect(() => {
    setLoading(false);

  }, []);
  const removeTestimonialsMutation = useMutation({
    mutationFn: (id: string) => deleteTestimonials(id),

    onSuccess: (data) => {
      alert("Testimonials deleted successfully")
      queryClient.invalidateQueries({ queryKey: ['testimonialslist'] });
    },
    onError: (error) => {
      console.error("Error  while deleting:", error);
    },
  });
  useEffect(() => {
    if (currentPage) {
      queryClient.invalidateQueries({ queryKey: ['testimonialslist'] });

    }
  }, [currentPage]);
  useEffect(() => {
    if (testimonialsListDatas && !isLoading && !error) {
      setTestimonials(testimonialsListDatas.data);
      setCurrentPage(testimonialsListDatas.meta.current_page);
      setTotalPages(testimonialsListDatas.meta.last_page);
      setLoading(false);
    }


  }, [testimonialsListDatas, isLoading, error])

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
    removeTestimonialsMutation.mutate(id);
  }

  return (
    <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <div className="flex gap-2">
          <Button asChild variant="secondary">
            <Link href="/admin">Back</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/testimonials/create">Add Testimonial</Link>
          </Button>
        </div>
      </div>
      {testimonials.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">No testimonials  found.</div>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((t) => (
            <Card key={t.id}>
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-lg">
                    <Link href={`/admin/testimonials/${t.id}`}>{t.name}</Link>
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {t.name}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/testimonials/${t.id}/edit`}>Edit</Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(t.id)}>Delete</Button>
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