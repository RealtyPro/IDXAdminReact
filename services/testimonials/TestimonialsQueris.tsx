
import {useMutation, useQuery} from '@tanstack/react-query'
import { fetchTestimonialsList, fetchSingleTestimonials, updateTestimonials } from './TestimonialsServices';
import { Testimonials } from '@/app/types/Testimonials';
export const useTestimonialsList = (page:Number) => {
    return useQuery({ queryKey: ['testimonialslist', ], queryFn: () =>  
      fetchTestimonialsList(page) });
  };
  
  export const useSingleTestimonials = (id:string) => {
    return useQuery({ queryKey: ['testimonialsData',id ], queryFn: () =>  fetchSingleTestimonials(id) });
  };
export const useCreateTestimonials = () => {
  return useQuery({
    queryKey: ['createTestimonials'],
    queryFn: () => {
      // Logic for creating a testimonials can be added here
      return {};
    },
  });
}
export const useUpdateTestimonials = (id:string) => {
  return useMutation({
    mutationFn: (testimonials: Testimonials) => updateTestimonials(id, testimonials)
  });
}
export const useDeleteTestimonials = (id:string) => {
  return useQuery({
    queryKey: ['deleteTestimonials', id],
    queryFn: () => {
      // Logic for deleting a testimonials can be added here
      return {};
    },
  });
}