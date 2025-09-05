import api from "../api";

export const assignClassTeacher = async ( data:any) => {
  try {
    const response = await api.post(`classes/assign-teacher/`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};


export const listClassTeacher = async () => {
  try {
    const response = await api.get(`teachers/`);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const singleClassTeacher = async ( id:number) => {
  try {
    const response = await api.get(`classes/class-teacher/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};


export const editClassTeacher = async ( data:any, id:number) => {
  try {
    const response = await api.patch(`classes/class-teacher/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const deleteClassTeacher = async (id:string) => {
  try {
    const response = await api.delete(`classes/class-teacher/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};