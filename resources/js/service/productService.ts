import axios from "axios"
 
export const productService = {
   getAll: async () => {
     return axios.get(`/api/products`)
   }
}