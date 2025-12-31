export interface PageMeta {
    exists: boolean;
    link: string;
}

export interface Page {
    id: string;
    title: string;  
    slug: string;
    date: string;   
    content: string;
    heading: string;
    sub_heading: string;
    abstract: string;
    meta_title: string;
    meta_keyword: string;
    meta_description: string;
    banner: string | null;
    images: string[];
    meta: PageMeta;
}

export interface PageListLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface PagePaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PageListMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: PagePaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface PageListResponse {
    currentPage: number;
    total: number;
    count: number;
    data: Page[];
    message: string;
    statusCode: number;
    links: PageListLinks;
    meta: PageListMeta;
}