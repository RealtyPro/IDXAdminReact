import { Page } from "@/app/types/Page";
import axiosInstance from "../Api";
export const  fetchPageList =async (page:Number) =>{
    const response = await axiosInstance.get(`/v1/page/page?page=${page}`);
    return response.data;
}
export const  fetchSinglePage =async (id:string) =>{
    const response = await axiosInstance.get(`/v1/page/page/${id}`);
    return response.data;
}

export const postNewPage = async (pagedata:Page) => {

    try {
      const response = await axiosInstance.post('/v1/page/page/', pagedata);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const updatePage = async (id:string,pagedata:Page) => {

    try {
      const response = await axiosInstance.put('/v1/page/page/'+id, pagedata);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const deletePage = async (id:string) => {

    try {
      const response = await axiosInstance.delete('/v1/page/page/'+id);
      return response.data;
    } catch (error) {
      throw error;
    }
  };