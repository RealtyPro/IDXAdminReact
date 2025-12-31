import { Blog } from "@/app/types/Blog";
import axiosInstance from "../Api";
export const  fetchBlogList =async (page:number) =>{
    const response = await axiosInstance.get(`/v1/admin/blog?page=${page}&ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`);
    return response.data;
}
export const  fetchSingleBlog =async (id:string) =>{
    const response = await axiosInstance.get(`/v1/admin/blog/${id}?ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`);
    return response.data;
}

export const postNewBlog = async (blogdata:Blog) => {

    try {
      const response = await axiosInstance.post(`/v1/admin/blog?ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`, blogdata);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const updateBlog = async (id:string,blogdata:Blog) => {

    try {
      const response = await axiosInstance.put(`/v1/admin/blog/${id}?ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`, blogdata);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const deleteBlog = async (id:string) => {

    try {
      const response = await axiosInstance.delete(`/v1/admin/blog/${id}?ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };