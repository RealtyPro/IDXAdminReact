"use client";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import React from 'react';
// import { postNewPage } from "@/services/page/PageServices"; // Uncomment and use for API integration

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import { useMutation } from "@tanstack/react-query";
import { postNewPage } from "@/services/page/PageServices";
import { postImages } from "@/services/shared/SharedService";

export default function PageCreatePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [heading, setHeading] = useState("");
  const [sub_heading, setSubHeading] = useState("");
  const [abstract, setAbstract] = useState("");
  const [meta_title, setMetaTitle] = useState("");
  const [meta_keyword, setMetaKeyword] = useState("");
  const [meta_description, setMetaDescription] = useState("");
  const [banner, setBanner] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [updatedImage, setUpdatedImage] = useState({});
  const [updatedBanner, setUpdatedBanner] = useState({});
  const postPageMutation = useMutation({
    mutationFn: (newPage: any) => postNewPage(newPage),

    onSuccess: (data) => {
      window.location.href = "/admin/pages";
    },
    onError: (error) => {
      console.error("Error  while creating new Page:", error);
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
    const postBannerMutation = useMutation({
    mutationFn: (newPage: any) => postImages(newPage),

    onSuccess: (data) => {
      console.log("banner posted successfully:", data);
      setUpdatedBanner(data);
    },
    onError: (error) => {
      console.error("Error  while creating new Page:", error);
    },
  });
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const filesArray = Array.from(e.target.files);
      const formData = new FormData();
      filesArray.forEach((file, index) => {
        formData.append('images', file);
      });
      postBannerMutation.mutate(formData);
      const reader = new FileReader();
      reader.onload = (ev) => setBanner(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Multiple images handler
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
    // Prepare form data as per Page type
    const formData = {
      title,
      slug,
      date,
      content,
      heading,
      sub_heading,
      abstract,
      meta_title,
      meta_keyword,
      meta_description,
      banner:updatedBanner,
      images:updatedImage
      // Add more fields if your Page type has them
    };

    postPageMutation.mutate(formData);
    // postNewPage(formData); // Uncomment and use for API integration
    alert(`Page added: ${title}`);
    // Optionally reset form
    setTitle("");
    setSlug("");
    setDate("");
    setContent("");
    setHeading("");
    setSubHeading("");
    setAbstract("");
    setMetaTitle("");
    setMetaKeyword("");
    setMetaDescription("");
    setBanner(null);
    setImages([]);
  };

  return (
    <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6 max-w-xl">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Add Page</CardTitle>
          <Button asChild variant="secondary" size="sm">
            <Link href="/admin/pages">Back</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={slug} onChange={e => setSlug(e.target.value)} required />
            </div>
            {/* <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </div> */}
            <div>
              <Label htmlFor="content">Content</Label>
              <ReactQuill theme="snow" value={content} onChange={setContent} className="bg-white" />
            </div>
            <div>
              <Label htmlFor="heading">Heading</Label>
              <Input id="heading" value={heading} onChange={e => setHeading(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="sub_heading">Sub Heading</Label>
              <Input id="sub_heading" value={sub_heading} onChange={e => setSubHeading(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="abstract">Abstract</Label>
              <Input id="abstract" value={abstract} onChange={e => setAbstract(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input id="meta_title" value={meta_title} onChange={e => setMetaTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="meta_keyword">Meta Keyword</Label>
              <Input id="meta_keyword" value={meta_keyword} onChange={e => setMetaKeyword(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Input id="meta_description" value={meta_description} onChange={e => setMetaDescription(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="banner">Banner</Label>
              <input id="banner" type="file" accept="image/*" onChange={handleBannerChange} />
              {banner && <img src={banner} alt="Banner Preview" className="max-h-40 mt-2" />}
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
            <Button type="submit">Add Page</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}