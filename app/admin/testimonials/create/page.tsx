"use client";
import React, { useState } from "react"; 
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function TestimonialCreatePage() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to create the testimonial
    alert(`Testimonial added: ${name}`);
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
              <textarea id="content" className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm" value={content} onChange={e => setContent(e.target.value)} required />
            </div>
            <Button type="submit">Add Testimonial</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}