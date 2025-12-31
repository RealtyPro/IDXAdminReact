"use client";
import React from 'react';
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockTestimonials } from '@/lib/mockData';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useSingleTestimonials } from '@/services/testimonials/TestimonialsQueris';

export default function TestimonialDetailsPage() {
  const [testimonial, setTestimonial] = useState<typeof mockTestimonials[0] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const {data: singleTestimonial, isLoading, error} = useSingleTestimonials(params.id as string);
  useEffect(() => {
    if (!isLoading && !error && singleTestimonial) {
      setTestimonial(singleTestimonial.data);
      
    } else {
      setTestimonial(undefined);
    }
    setLoading(isLoading);
    
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer); 
  }, [singleTestimonial?.data, isLoading, error]);

  if (loading) {
    return (
      <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6 max-w-2xl">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }

  if (!testimonial) {
    return (
      <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Testimonial Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">The testimonial you are looking for does not exist.</div>
            <Button asChild variant="secondary" className="mt-4">
              <Link href="/admin/testimonials">Back to Testimonials</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6 max-w-2xl">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-xl">{testimonial.name}</CardTitle>
            <div className="text-sm text-muted-foreground">{testimonial.date}</div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/testimonials/${testimonial.id}/edit`}>Edit</Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href="/admin/testimonials">Back</Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={() => alert('Deleted!')}>Delete</Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="prose max-w-none">
            {testimonial.content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 