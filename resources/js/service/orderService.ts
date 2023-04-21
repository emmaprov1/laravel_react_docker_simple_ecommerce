import axios from "axios"
 
export const orderService = {
 
  index: async () => { 
    return axios.get(`/api/orders`)
  },
  details: async (transaction_id:string) => { 
    return axios.get(`/api/orders/${transaction_id}`)
  },
  updateStatus: async (data:{status: string, transactionId: string}) => { 
    return axios.post(`/api/orders/update`, data)
  }
 
}