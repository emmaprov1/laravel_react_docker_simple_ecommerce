import axios from "axios"
 
export const customerService = {
 
  index: async () => { 
    return axios.get(`/api/customer`)
  }, 

  remove: async (id:number) => { 
    return axios.delete(`/api/customer/${id}`)
  },

  myOrder: async (userId:string) => { 
    return axios.get(`/api/customer/orders/${userId}`)
  }
 
}