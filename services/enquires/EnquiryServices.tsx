import { Enquiry } from "@/app/types/Enquiry";
import axiosInstance from "../Api";
export const  fetchEnquiryList =async (page:number) =>{
    const response = await axiosInstance.get(`/v1/admin/enquiry?page=${page}&ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`);
    return response.data;
}
export const  fetchSingleEnquiry  =async (id:string) =>{
    const response = await axiosInstance.get(`/v1/admin/enquiry/${id}?ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`);
    return response.data;
}
export const updateEnquiry = async (id:string,enquirydata:Enquiry ) => {

    try {
      const response = await axiosInstance.put(`/v1/admin/enquiry/${id}?ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`, enquirydata)
      return response.data;
    } catch (error) {
      throw error;
    }
  };
    export const deleteEnquiry  = async (id:string) => {

    try {
      const response = await axiosInstance.delete(`/v1/admin/enquiry/${id}?ListAgentMlsId=${process.env.NEXT_PUBLIC_REALTY_PRO_AGENT_ID}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };