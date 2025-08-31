import api from "../api";

export const createStudent = async (data: any) => {
  try {
    const formData = new FormData();

    // loop through object and append to formData
    Object.keys(data).forEach((key) => {
      if (key === "student_photo" && data[key]) {
        formData.append("student_photo", data[key]); 
      } else {
        formData.append(key, data[key]);
      }
    });

    const response = await api.post(`students/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};
