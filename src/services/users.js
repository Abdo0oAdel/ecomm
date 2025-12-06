import { axiosWithAuth } from "../utils/helpers";

export const getUsers = async () => {
  return axiosWithAuth.get("/api/User");
};

export const getUserById = async (id) => {
  return axiosWithAuth.get(`/api/User/${id}`);
};

export const getUserByEmail = async (email) => {
  return axiosWithAuth.get(`/api/User/email/${email}`);
};

export const createUser = async (userData) => {
  return axiosWithAuth.post("/api/User", userData);
};

export const updateUser = async (id, userData) => {
  return axiosWithAuth.put(`/api/User/${id}`, userData);
};

export const deleteUser = async (id) => {
  return axiosWithAuth.delete(`/api/User/${id}`);
};

export const updateUserRole = async (id, roleData) => {
  return axiosWithAuth.put(`/api/User/updateRole/${id}`, roleData);
};

export const changeUserPassword = async (passwordData) => {
  return axiosWithAuth.post("/api/User/change-password", passwordData);
};

export const uploadUserImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("Image", imageFile);
  return axiosWithAuth.post("/api/upload-image", formData);
};

export const deleteUserImage = async () => {
  return axiosWithAuth.delete("/api/delete-image");
};

export const checkEmail = async (email) => {
  return axiosWithAuth.get(`/api/User/check-email/${email}`);
};

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole,
  changeUserPassword,
  uploadUserImage,
  deleteUserImage,
  checkEmail,
};


