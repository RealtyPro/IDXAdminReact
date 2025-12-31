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
import { useSingleTestimonials, useUpdateTestimonials } from '@/services/testimonials/TestimonialsQueris';
import { useMutation } from '@tanstack/react-query';
import { postImages } from '@/services/shared/SharedService';

export default function TestimonialEditPage() {
  const [testimonial, setTestimonial] = useState<typeof mockTestimonials[0] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { data: singleTestimonial, isLoading, error } = useSingleTestimonials(params.id as string);
  const { mutateAsync: updateTestimonials } = useUpdateTestimonials(params.id as string);
  const [images, setImages] = useState<string[]>([]);
  const [updatedImage, setUpdatedImage] = useState({});
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
  const postImageMutation = useMutation({
    mutationFn: (newPage: any) => postImages(newPage),

    onSuccess: (data) => {
      console.log("Image posted successfully:", data);
      setUpdatedImage(data);
    },
    onError: (error) => {
      console.error("Error  while creating new Page:", error);
    },
  });
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const formData = new FormData();

      filesArray.forEach((file, index) => {
        formData.append('images', file);

      });
      postImageMutation.mutate(formData);
      const readers = filesArray.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target?.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(setImages);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let data = {
      testimonial,
      image: updatedImage
    }
    handleSave(data);
  };
  const handleSave = async (newValues: any) => {
    try {
      await updateTestimonials(newValues, {
        onSuccess: (data) => {

          window.location.href = `/admin/testimonials`;
        },
        onError: (error) => {
          console.error('Failed to update the blog!', error);
        }
      });
    } catch (error) {
      // fallback if onError wasn't provided
      console.error('Error occurred!', error);
    }
  }

  if (isLoading) {
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
              <Input id="name" defaultValue={testimonial.name}
                onChange={(e) => setTestimonial({ ...testimonial, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <textarea id="content" className="w-full min-h-[100px] 
              rounded-md border border-input bg-background px-3 py-2 
              text-sm" defaultValue={testimonial.details}
                onChange={(e) => setTestimonial({ ...testimonial, details: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="images">Images</Label>
              <input id="images" type="file" accept="image/*" multiple onChange={handleImagesChange} />
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, idx) => (
                  <img key={idx} src={img} alt={`Image ${idx + 1}`} className="max-h-20 rounded" />
                ))}
              </div>
            </div>
            <Button type="submit" onClick={handleSubmit}>Update</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 