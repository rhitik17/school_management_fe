import api from "../api";

export const addEmployee = async (data: any) => {
  try {
    const formData = new FormData();

    // loop through object and append to formData
    Object.keys(data).forEach((key) => {
      if (key === "photo" && data[key]) {
        formData.append("photo", data[key]); 
      } else {
        formData.append(key, data[key]);
      }
    });

    const response = await api.post(`employees/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};
