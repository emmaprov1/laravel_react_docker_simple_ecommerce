import axios from 'axios'
import { registerFormProps } from '../Page/Customers/Customers'

export const customerService = {

  index: async () => {
    return axios.get('/api/customer')
  },

  remove: async (id:number) => {
    return axios.delete(`/api/customer/${id}`)
  },

  create: async (data:registerFormProps) => {
    return axios.post('/api/customer/create/', data)
  },

  myOrder: async (userId:string) => {
    return axios.get(`/api/customer/orders/${userId}`)
  }

}
