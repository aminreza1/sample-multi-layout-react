import axios from "axios";

enum APIMethods{
  GET,POST,PUT,DELETE
}

interface APIListInterface{
  key: string,
  method: APIMethods,
  url: string
}

const http = axios.create({
  baseURL: "http://192.168.0.140:8081/api/",
});

// export const apis2: APIListInterface[] = [
//   {key:"getProductsInAdmin", method:APIMethods.GET, url:"admin/products"},
//   {key:"CreateProductsInAdmin", method:APIMethods.POST, url:"admin/products"}
// ]


export const apis: { [key: string]: string } = {
  product_public: "products",
  product_admin: "admin/products",
  category_public: "categories",
  category_admin: "admin/categories",
  login: "auth/login",
  register: "auth/register",
};
export default http;
