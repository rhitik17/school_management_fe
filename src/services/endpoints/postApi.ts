import { PostType } from "../../types/postType";
import api from "../api";


// helper to convert normal object -> FormData
// const objectToFormData = (data: any) => {
//   const formData = new FormData();
//   Object.entries(data).forEach(([key, value]) => {
//     if (value !== null && value !== undefined) {
//       // handle files
//       if ((key === "studentPhoto" || "photo" )&& value instanceof File) {
//         formData.append(key, value);
//       } else if (Array.isArray(value)) {
//         value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
//       } else {
//         formData.append(key, value as any);
//       }
//     }
//   });
//   return formData;
// };

// export const createPost = async (postType: PostType, data: any) => {
//   try {
//     let payload = data;
//     let headers: any = {};

//     // Only students (and maybe employees later) need FormData
//     if (postType === "students" || "employees") {
//       payload = objectToFormData(data);
//       headers["Content-Type"] = "multipart/form-data";
//     }

//     const response = await api.post(`${postType}/`, payload, { headers });
//     return response.data;
//   } catch (error) {
//     console.error("Error creating post:", error);
//     throw error;
//   }
// };


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

export const singlePost = async (postType: any, id:number) => {
  try {
    const response = await api.get(`${postType}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};


export const editPost = async (postType: PostType, data:any, id:number) => {
  try {
    const response = await api.patch(`${postType}/${id}`, data);
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