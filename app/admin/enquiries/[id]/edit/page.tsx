"use client";
import React from 'react';
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import 'react-quill-new/dist/quill.snow.css';
import { useSingleBlog, useUpdateBlog } from '@/services/blog/BlogQueris';
import { Blog } from '@/app/types/Blog';
import { useSingleEnquiery, useUpdateEnquiry } from '@/services/enquires/EnquiryQueris';
import { Enquiry } from '@/app/types/Enquiry';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function EnquiryEditPage() {

    const [enquiry, setEnquery] = useState<Enquiry| undefined>(undefined);
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    // const { data: singleBlog, isLoading, error} = useSingleBlog({ id: params.id as string });
    // const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: singleEnquiry, isLoading, error } = useSingleEnquiery(params.id as string);
    const { mutateAsync: updateEnquiry}  = useUpdateEnquiry(params.id as string);

    useEffect(() => {

        const found = singleEnquiry?.data;
        console.log("Enquiry found:", found);
        if (found) {
            setEnquery(found);
        }
        setLoading(isLoading);
    }, [singleEnquiry]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImage(ev.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
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

    if (!enquiry) {
        return (
            <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6 max-w-xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Enquiry not found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-muted-foreground">The enquiry post you are looking for does not exist.</div>
                        <Button asChild variant="secondary" className="mt-4">
                            <Link href="/admin/enquiry ">Back to Enquiry List</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically make an API call to update the enquiry
        // const updated =updateBlog(enquiry);

        // console.log("Blog updated successfully:", updated);
        // alert(`Blog updated: ${enquiry.title}`);
        handleSave(enquiry);
    };
    const handleSave = async (newValues: any) => {
        try {
            await updateEnquiry(newValues, {
                onSuccess: (data) => {
                    // e.g., show a toast or navigate somewhere

                    window.location.href = `/admin/enquiries`;
                },
                onError: (error) => {
                    console.error('Failed to update the enquiry!', error);
                    // e.g., show an error toast
                }
            });
        } catch (error) {
            // fallback if onError wasn't provided
            console.error('Error occurred!', error);
        }
    }
    return (
        <div className="container mx-auto py-6 px-2 sm:px-4 space-y-6 max-w-xl">
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Edit Enquiry Post </CardTitle>
                    <Button asChild variant="secondary" size="sm">
                        <Link href={`/admin/enquiries`}>Back</Link>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="title">Name</Label>
                            <Input id="title" readOnly
                                value={enquiry.name} onChange={e => setEnquery({ ...enquiry, name: e.target.value })} required />
                        </div>
                        <div>
                            <Label htmlFor="subtitle">Email</Label>
                            <Input id="subtitle" value={enquiry.email} readOnly
                                onChange={e => setEnquery({ ...enquiry, email: e.target.value })} />
                        </div>
                        <div>
                            <Label htmlFor="subtitle">Contact number</Label>
                            <Input id="subtitle" value={enquiry.contact_no} readOnly
                                onChange={e => setEnquery({ ...enquiry, contact_no: e.target.value })} />
                        </div>
                        <div>
                            <Label htmlFor="content">Content</Label>
                            <ReactQuill theme="snow" readOnly
                                value={enquiry.description} onChange={e => setEnquery({ ...enquiry, description: e })} className="bg-white" />
                        </div>

                        <div>
                            <Label htmlFor="status">Status </Label>
                            <select
                                id="status"
                                value={enquiry.status}
                                onChange={(e) => setEnquery({ ...enquiry, status: e.target.value })}
                                // onChange={(e) => setBlog({ ...enquiry, category: e.target.value })}
                                className="block w-full text-sm border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select a status    </option>
                                <option value="active">Active  </option>
                                <option value="inactive">Inactive  </option>
                            </select>
                        </div>


                        <Button type="submit">Update Enquiry</Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 