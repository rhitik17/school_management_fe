import api from "../api";


export const createPost = async (postType: any, data:any) => {
  try {
    const response = await api.post(`${postType}`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};


export const listPost = async (postType: any) => {
  try {
    const response = await api.get(`${postType}`);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
