"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { postNewTestimonials } from "@/services/testimonials/TestimonialsServices";
import { postImages } from "@/services/shared/SharedService";

export default function TestimonialCreatePage() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [updatedImage, setUpdatedImage] = useState({});
  const postTestimonialMutation = useMutation({
    mutationFn: (newBlog: any) => postNewTestimonials(newBlog),

    onSuccess: (data) => {
      console.log("testimonial posted successfully:", data);
      window.location.href = "/admin/testimonials";

    },
    onError: (error) => {
      console.error("Error  while creating new testmonial:", error);
    },
  });
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
    const data = {
      name,
      content,
      image: updatedImage,
    }
    postTestimonialMutation.mutate(data);

  };

  return (
    <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6 max-w-xl">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Add Testimonial</CardTitle>
          <Button asChild variant="secondary" size="sm">
            <Link href="/admin/testimonials">Back</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <textarea id="content" className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={content} onChange={e => setContent(e.target.value)} required />
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
            <Button type="submit">Add Testimonial</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}