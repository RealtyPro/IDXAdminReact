import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEnquiryList, fetchSingleEnquiry, updateEnquiry } from "./EnquiryServices";
import { Enquiry } from "@/app/types/Enquiry";

export const useEnquiryList = (page: number) => {
    return useQuery({
        queryKey: ['enquiryList',], queryFn: () =>
            fetchEnquiryList(page)
    });
};
export const useSingleEnquiery  =(id: string) => {
    return useQuery({ queryKey: ['enquiryData', id], queryFn: () =>fetchSingleEnquiry(id) });
};

export const useUpdateEnquiry = (id:string) => {
  return useMutation({
    mutationFn: (enquirydata:Enquiry) => updateEnquiry (id, enquirydata)    
  });
}