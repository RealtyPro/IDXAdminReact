
import {useQuery} from '@tanstack/react-query'
import { fetchBlogList, fetchSingleBlog } from './BlogServices';
export const useBlogList = ({}) => {
    return useQuery({ queryKey: ['bloglist', ], queryFn: () =>  fetchBlogList({}) });
  };
  interface UseSingleBlogProps {
    id: string;
  }
  export const useSingleBlog = ({id}:UseSingleBlogProps) => {
    return useQuery({ queryKey: ['blogData',id ], queryFn: () =>  fetchSingleBlog(id) });
  };