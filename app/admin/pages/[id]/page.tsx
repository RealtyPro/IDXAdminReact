"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useSinglePage } from "@/services/page/PageQueris"; // Updated hook import
import { mockPages } from '@/lib/mockData';

export default function PageDetailPage() {
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
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-2 sm:px-4 max-w-xl">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl mt-4" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="container mx-auto py-6 px-2 sm:px-4 max-w-xl">
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
    <div className="container mx-auto py-6 px-2 sm:px-4 max-w-xl">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{page.title}</CardTitle>
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/pages`}>back</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="font-semibold">Slug:</span> {page.slug}
          </div>
          {/* <div>
            <span className="font-semibold">Date:</span> {page.date}
          </div> */}
          <div>
            <span className="font-semibold">Heading:</span> {page.heading}
          </div>
          <div>
            <span className="font-semibold">Sub Heading:</span> {page.sub_heading}
          </div>
          <div>
            <span className="font-semibold">Abstract:</span> {page.abstract}
          </div>
          <div>
            <span className="font-semibold">Meta Title:</span> {page.meta_title}
          </div>
          <div>
            <span className="font-semibold">Meta Keyword:</span> {page.meta_keyword}
          </div>
          <div>
            <span className="font-semibold">Meta Description:</span> {page.meta_description}
          </div>
          {page.banner && (
            <div>
              <span className="font-semibold">Banner:</span>
              <img src={page.banner} alt="Banner" className="max-h-40 mt-2 rounded" />
            </div>
          )}
          {page.images && page.images.length > 0 && (
            <div>
              <span className="font-semibold">Images:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {page.images.map((img: string, idx: number) => (
                  <img key={idx} src={img} alt={`Image ${idx + 1}`} className="max-h-20 rounded" />
                ))}
              </div>
            </div>
          )}
          <div>
            <span className="font-semibold">Content:</span>
            <div
              className="prose max-w-none mt-2"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

