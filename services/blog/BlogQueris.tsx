
import {useMutation, useQuery} from '@tanstack/react-query'
import { fetchBlogList, fetchSingleBlog, updateBlog } from './BlogServices';
import { Blog } from '@/app/types/Blog';
export const useBlogList = (page:number) => {
    return useQuery({ queryKey: ['bloglist', ], queryFn: () => 
       fetchBlogList(page) });
  };
  
  export const useSingleBlog = (id:string) => {
    return useQuery({ queryKey: ['blogData',id ], queryFn: () =>  fetchSingleBlog(id) });
  };
export const useCreateBlog = () => {
  return useQuery({
    queryKey: ['createBlog'],
    queryFn: () => {
      // Logic for creating a blog can be added here
      return {};
    },
  });
}
export const useUpdateBlog = (id:string) => {
  return useMutation({
    mutationFn: (blog: Blog) => updateBlog(id, blog)
  });
}
export const useDeleteBlog = (id:string) => {
  return useQuery({
    queryKey: ['deleteBlog', id],
    queryFn: () => {
      // Logic for deleting a blog can be added here
      return {};
    },
  });
}