"use client";
import React from 'react';
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { mockTestimonials } from '@/lib/mockData';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function TestimonialEditPage() {
  const [testimonial, setTestimonial] = useState<typeof mockTestimonials[0] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    setTestimonial(mockTestimonials.find((t) => t.id === params.id));
    setLoading(false);
  }, [params.id]);

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

  if (!testimonial) {
    return (
      <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6 max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Testimonial Not Found</CardTitle>
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
    <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6 max-w-xl">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Edit Testimonial</CardTitle>
          <div className="flex gap-2">
            <Button asChild variant="secondary" size="sm">
              <Link href={`/admin/testimonials/${testimonial.id}`}>Back</Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={() => alert('Deleted!')}>Delete</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={testimonial.name} />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <textarea id="content" className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={testimonial.content} />
            </div>
            <Button type="submit">Update</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 