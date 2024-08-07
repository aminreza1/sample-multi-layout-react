import axios from "axios";

const http = axios.create({
  baseURL: "https://localhost:7181/api/",
});

export const apis: { [key: string]: string } = {
  product_public: "products",
  product_admin: "admin/products",
  category_public: "categories",
  category_admin: "admin/categories",
  login: "auth/login",
  register: "auth/register",
};
export default http;
