import { PostType } from "../../types/postType";
import api from "../api";


export const createPost = async (postType: PostType, data:any) => {
  try {
    const response = await api.post(`${postType}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};


export const listPost = async (postType: any) => {
  try {
    const response = await api.get(`${postType}/`);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const deletePost = async (postType: any, id:string) => {
  try {
    const response = await api.delete(`${postType}/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};


// ==> Switch Academic Sessions

export const switchSession = async ( data:any) => {
  try {
    const response = await api.post(`/switch-academic-session/`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};