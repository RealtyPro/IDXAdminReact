import { Testimonials } from "@/app/types/Testimonials";
import axiosInstance from "../Api";
export const  fetchTestimonialsList =async (page:Number) =>{
    const response = await axiosInstance.get(`/v1/admin/testimonial?page=${page}&ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`);
    return response.data;
}
export const  fetchSingleTestimonials =async (id:string) =>{
    const response = await axiosInstance.get(`/v1/admin/testimonial/${id}?ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`);
    return response.data;
}
export const postNewTestimonials = async (testimonialsdata:Testimonials) => {

    try {
      const response = await axiosInstance.post(`/v1/admin/testimonial?ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`, testimonialsdata);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const updateTestimonials = async (id:string,testimonialsdata:Testimonials) => {

    try {
      const response = await axiosInstance.put(`/v1/admin/testimonial/${id}?ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`, testimonialsdata);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const deleteTestimonials = async (id:string) => {

    try {
      const response = await axiosInstance.delete(`/v1/admin/testimonial/${id}?ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };