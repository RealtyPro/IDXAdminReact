export interface BlogMeta {
    exists: boolean;
    link: string;
}

export interface Blog {
    id: string;
    title: string;
    slug: string;
    content: string;
    status: string;
    created_at: string;
    updated_at: string;
    meta: BlogMeta;
    author: string;
    category: string;
    date: string;
    publishDate: string;
    subtitle: string;
    is_featured: boolean;
    isFeatured: boolean;
}

export interface BlogListLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface BlogPaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface BlogListMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: BlogPaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface BlogListResponse {
    currentPage: number;
    total: number;
    count: number;
    data: Blog[];
    message: string;
    statusCode: number;
    links: BlogListLinks;
    meta: BlogListMeta;
}