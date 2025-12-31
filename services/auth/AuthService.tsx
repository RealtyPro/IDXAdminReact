import axios from "axios";
import axiosInstance from "../Api";

export const login = async (data:object) => {

    try {
       
      const response = await axiosInstance.post('/login', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };