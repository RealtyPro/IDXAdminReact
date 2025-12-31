"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { mockPages } from '@/lib/mockData';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import { useSinglePage } from '@/services/page/PageQueris';

export default function PageEditPage() {
  const [page, setPage] = useState<typeof mockPages[0] | undefined>(undefined);
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
  const [loading, setLoading] = useState(true);
  const params = useParams();
   const { data: singlePage, isLoading, error} = useSinglePage(params.id as string);
   
  useEffect(() => {
    if (!isLoading && !error && singlePage) {
      setPage(singlePage.data);
      setTitle(singlePage.data.title || "");
      setSlug(singlePage.data.slug || "");
      setDate(singlePage.data.date || "");
      setContent(singlePage.data.content || "");
      setHeading(singlePage.data.heading || "");
      setSubHeading(singlePage.data.sub_heading || "");
      setAbstract(singlePage.data.abstract || "");
      setMetaTitle(singlePage.data.meta_title || "");
      setMetaKeyword(singlePage.data.meta_keyword || "");
      setMetaDescription(singlePage.data.meta_description || "");
      setBanner(singlePage.data.banner || null);
      setImages(singlePage.data.images || []);
    }
    // const found = mockPages.find((p) => p.id === params.id);
    // setPage(found);
    // if (found) {
    //   setTitle(found.title || "");
    //   setSlug(found.slug || "");
    //   setDate(found.date || "");
    //   setContent(found.content || "");
    //   setHeading(found.heading || "");
    //   setSubHeading(found.sub_heading || "");
    //   setAbstract(found.abstract || "");
    //   setMetaTitle(found.meta_title || "");
    //   setMetaKeyword(found.meta_keyword || "");
    //   setMetaDescription(found.meta_description || "");
    //   setBanner(found.banner || null);
    //   setImages(found.images || []);
    // }
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [singlePage,isLoading,error]);

  // Banner image handler
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setBanner(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Multiple images handler
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
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
      banner,
      images,
      // Add more fields if your Page type has them
    };
    // Call your update API here, e.g. updatePage(page.id, formData)
    alert(`Page updated: ${title}`);
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

  if (!page) {
    return (
      <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6 max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Page Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">The page you are looking for does not exist.</div>
            <Button asChild variant="secondary" className="mt-4">
              <Link href="/admin/pages">Back to Pages</Link>
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
          <CardTitle>Edit Page</CardTitle>
          <Button asChild variant="secondary" size="sm">
            <Link href={`/admin/pages/${page.id}`}>Back</Link>
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
            <Button type="submit">Update</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}