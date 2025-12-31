import { Image } from "@/app/types/Global";
import axiosInstance from "../Api";
import axios from "axios";

export const postImages = async (formData:File) =>{

    try {
      
          const response = await axios.post(
      'http://127.0.0.1:8000/api/filer/upload/idx.page.page.model/2025/04/12/989877/images/', 
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    
        return response.data;                                                       
    } catch (error) {
      throw error;
    }
  };