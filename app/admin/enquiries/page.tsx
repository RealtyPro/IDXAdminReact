"use client";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { mockInquiries } from '@/lib/mockData';
import React from 'react';
import { useEnquiryList } from "@/services/enquires/EnquiryQueris";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEnquiry } from "@/services/enquires/EnquiryServices";
interface Inquiry {
  id: string;
  name: string;
  email: string;
  date: string;
  listingId: string;
  message: string;

}
export default function EquiriesPage() {
  const [inquiries, setInquiries] = useState<typeof mockInquiries>([]);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const { data: enquiryListDatas, isLoading, error } = useEnquiryList(currentPage);

  useEffect(() => {
    // setInquiries(mockInquiries);
    setLoading(false);
  }, []);
  useEffect(() => {
    if (enquiryListDatas && !error) {
      // setBlogs(blogListDatas);
      setInquiries(enquiryListDatas.data);
      setCurrentPage(enquiryListDatas.meta.current_page);
      setTotalPages(enquiryListDatas.meta.last_page);
      setTotal(enquiryListDatas.meta.total);
      setPerPage(enquiryListDatas.meta.per_page);
    }


  }, [enquiryListDatas, isLoading, error]);
  const removeEnquiryMutation = useMutation({
    mutationFn: (id: string) => deleteEnquiry(id),

    onSuccess: (data) => {
      alert("Enquiry deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['enquiryList'] });
    },
    onError: (error) => {
      console.error("Error  while deletion:", error);
    },
  });
  useEffect(() => {
    if (currentPage) {
      queryClient.invalidateQueries({ queryKey: ['enquiryList'] });

    }
  }, [currentPage]);
  const handleDelete = (id: string) => {
    removeEnquiryMutation.mutate(id);

  }
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24 rounded" />
            <Skeleton className="h-10 w-40 rounded" />
          </div>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Enquiries</h1>
        <div className="flex gap-2">
          <Button asChild variant="secondary">
            <Link href="/admin">Back</Link>
          </Button>
          {/* <Button asChild>
            <Link href="/admin/inquiries/create">New Inquiry</Link>
          </Button> */}
        </div>
      </div>
      <div className="grid gap-4">
        {inquiries.map((inquiry) => (
          <Card key={inquiry.id}>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-lg">
                  <Link href={`/admin/inquiries/${inquiry.id}`}>{inquiry.name}</Link>
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {inquiry.email} • {inquiry.date} • Listing: {inquiry.listingId}
                </div>
                <div className="text-sm text-dark mt-2">{inquiry.message}</div>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/enquiries/${inquiry.id}/edit`}>Edit</Link>
                </Button>
                <Button variant="destructive" size="sm"
                  onClick={() => handleDelete(inquiry.id)}
                >Delete</Button>
              </div>
            </CardHeader>
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