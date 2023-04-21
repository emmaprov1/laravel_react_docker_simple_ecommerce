import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './Cart.scss'
import { cartService } from '../../service/cartService'
import ImageSrc from '../../components/ImageSrc/ImageSrc'
import toast, { Toaster } from 'react-hot-toast'

const Cart = () => {
  const [data, setData] = useState([])
  const [request, setRequest] = useState(false)
  const [totalCost, setTotalCost] = useState(0)

  const getCart = async () => {
    setRequest(true)

    await cartService.index(window.User.id).then((res) => {
      setData(res.data.data)
      setRequest(false)
    }, error => {
      setRequest(false)
      console.log('error', error.response)
    })
  }

  useEffect(() => {
    getCart()
  }, [])

  const getTotal = () => {
    let total = 0

    data.filter((res:{product:{price:number}, quantity:number}) => {
      total += (res.product.price * res.quantity)
      return true
    })

    setTotalCost(total)
  }

  useEffect(() => {
    getTotal()
  }, [data])

  const deleteItem = async (id:number) => {
    const loader = toast.loading('Removing item...')
    await cartService.remove(id).then((res) => {
      console.log('checkout', res)
      toast.dismiss(loader)
      toast.success('Item removed from cart', { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })

      setTimeout(() => {
        getCart()
      }, 300)
    }, error => {
      console.log('error', error.response)
      toast.dismiss(loader)
      toast.error(error.message, { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })
    })
  }

  return (
        <div className='cart'>
            <div className="container">
                <h2>
                    Cart
                </h2>
                <div className="card border-0 cart-bottom">
                    <div className="card-body">
                        <div className="table responsive mt-5">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Image</th>
                                        <th scope='col'>Product Name</th>
                                        <th scope='col'>Product Quantity</th>
                                        <th scope='col'>Unit Price</th>
                                        <th scope='col'>Total Price</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                {request === false && data.map((res:any, index:React.Key) => {
                                  return <tr key={index}>
                                        <td>{res.id}</td>
                                        <td>
                                            <ImageSrc src={res.product.image} alt={res.product.name} title={res.product.name} width={'cart-product-image'}></ImageSrc>
                                        </td>
                                        <td>{res.product.name}</td>
                                        <td>{res.quantity}</td>
                                        <td>&#8358;{res.product.price}</td>
                                        <td>&#8358;{res.quantity * res.product.price}</td>
                                        <td><button className="btn bg-danger btn-sm text-white" onClick={() => deleteItem(res.id)}>remove</button></td>
                                    </tr>
                                }
                                )}

                                {request === false && data.length === 0 && <tr>
                                    <td colSpan={6} className='text-center'>
                                        Cart is empty
                                    </td>
                                </tr>}

                            </table>
                        </div>
                    </div>
                </div>
             {request === true && <span className='spinner-border spinner-border-sm'></span>}

             {request === false && data.length > 0 && <div className='row justify-content-end'>
                    <div className="col-md-4">
                        <div className="card border-0 cart-bottom mt-3">
                            <div className="card-body">
                                <table className='w-100'>
                                    <tr className='border-bottom'>
                                        <td className='fw-bolder'>Sub Total</td>
                                        <td className='text-end'>&#8358;0</td>
                                    </tr>
                                    <tr className='border-bottom'>
                                        <td className='fw-bolder'>Delivery fee</td>
                                        <td className='text-end'>&#8358;0</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bolder'>Total</td>
                                        <td className='text-end'>&#8358;{totalCost}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <div className='w-100 mt-4'>
                                               <a href="/checkout">
                                                  <button className='btn btn-primary btn-lg btn-block w-100'>Checkout</button>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
            <Toaster></Toaster>
        </div>
  )
}

export default Cart

if (document.getElementById('cart')) {
  const doc:any = document.getElementById('cart')
  const Index = ReactDOM.createRoot(doc)

  Index.render(
        <React.StrictMode>
            <Cart/>
        </React.StrictMode>
  )
}
