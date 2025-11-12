import apiFetch from "./api";

const BASE = "/api/Categories";

export const getCategories = async () => {
  return apiFetch(BASE);
};

export const getCategoryById = async (id) => {
  return apiFetch(`${BASE}/${id}`);
};

export default {
  getCategories,
  getCategoryById,
};
