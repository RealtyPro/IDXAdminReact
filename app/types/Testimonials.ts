export interface TestimonialsMeta {
    exists: boolean;
    link: string;
}

export interface Testimonials {
  id: string;
  name: string;
  slug: string;
  details: string;
//   image: string/
  user_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  images:object[];

}

export interface TestimonialsListLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface TestimonialsPaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface TestimonialsListMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: TestimonialsPaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface TestimonialsListResponse {
    currentPage: number;
    total: number;
    count: number;
    data: Testimonials[];
    message: string;
    statusCode: number;
    links: TestimonialsListLinks;
    meta: TestimonialsListMeta;
}