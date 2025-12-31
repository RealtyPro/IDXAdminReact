
import {useMutation, useQuery} from '@tanstack/react-query'
import { fetchPageList, fetchSinglePage, updatePage } from './PageServices';
import { Page } from '@/app/types/Page';
export const usePageList = (page:Number) => {
    return useQuery({ queryKey: ['pagelist', ], queryFn: () =>  fetchPageList(page) });
  };
  
  export const useSinglePage = (id:string) => {
    return useQuery({ queryKey: ['pageData',id ], queryFn: () =>  fetchSinglePage(id) });
  };
export const useCreatePage = () => {
  return useQuery({
    queryKey: ['createPage'],
    queryFn: () => {
      // Logic for creating a page can be added here
      return {};
    },
  });
}
export const useUpdatePage = (id:string) => {
  return useMutation({
    mutationFn: (page: Page) => updatePage(id, page)
  });
}
export const useDeletePage = (id:string) => {
  return useQuery({
    queryKey: ['deletePage', id],
    queryFn: () => {
      // Logic for deleting a page can be added here
      return {};
    },
  });
}