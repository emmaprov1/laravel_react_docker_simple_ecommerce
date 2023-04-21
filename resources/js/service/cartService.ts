import axios from 'axios'
import { checkoutFormProp } from '../Page/Checkout/Checkout'

export const cartService = {

  index: async (userId: number) => {
    return axios.get(`/api/cart/${userId}`)
  },

  add: async (data: {product_id: number, user_id: number, quantity:number}) => {
    return axios.post('/api/cart/add', data)
  },

  remove: async (id:number) => {
    return axios.delete(`/api/cart/delete/${id}`)
  },

  checkout: async (data: checkoutFormProp) => {
    return axios.post('/api/checkout/add', data)
  }
}
