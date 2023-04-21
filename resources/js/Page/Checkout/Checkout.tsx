import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './Checkout.scss'
import { cartService } from '../../service/cartService'
import ImageSrc from '../../components/ImageSrc/ImageSrc'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

export type checkoutFormProp = {
   firstname: string;
   lastname: string;
   address: string;
   state: string;
   country: string;
   user_id: number;
}

const Checkout = () => {
  const [data, setData] = useState([])
  const [request, setRequest] = useState(false)
  const [requestCheckout, setRequestCheckout] = useState(false)
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

    data.filter((res:{product:{price:number}}) => {
      total += res.product.price
      return true
    })

    setTotalCost(total)
  }

  useEffect(() => {
    getTotal()
  }, [data])

  const { register, handleSubmit, formState: { errors } } = useForm<checkoutFormProp>()

  const submit = async (data: checkoutFormProp) => {
    console.log(data)

    setRequestCheckout(true)

    const loader = toast.loading('Adding item...')

    await cartService.checkout(data).then((res) => {
      toast.dismiss(loader)

      setRequestCheckout(false)

      toast.success('Order created, No payment module integrated', { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })
    }, error => {
      setRequestCheckout(false)

      toast.dismiss(loader)

      toast.error(error.response.data.message, { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })
    })
  }

  return (
        <div className='checkout'>
            <div className="container">
                <h2>
                    Checkout
                </h2>
                <form onSubmit={handleSubmit(submit)}>
                <div className="row mt-5">
                    <div className="col-md-6">
                        <h4 className='fw-bolder mb-3'>Billing information</h4>
                        <form action="">
                            <input type="hidden" {...register('user_id')} value={window.User.id}/>
                            <div className="form-input mb-3">
                                <label htmlFor="">First Name</label>
                                <input type="text" className="form-control" {...register('firstname', { required: 'field is required' })}/>
                                {errors.firstname && <div className='text-danger'>{errors.firstname.message}</div>}
                            </div>
                            <div className="form-input mb-3">
                                <label htmlFor="">Last Name</label>
                                <input type="text" className="form-control" {...register('lastname', { required: 'field is required' })}/>
                                {errors.lastname && <div className='text-danger'>{errors.lastname.message}</div>}
                            </div>
                            <div className="form-input mb-3">
                                <label htmlFor="">Address</label>
                                <textarea className="form-control" {...register('address', { required: 'field is required' })}></textarea>
                                {errors.address && <div className='text-danger'>{errors.address.message}</div>}
                            </div>
                            <div className="form-input mb-3">
                                <label htmlFor="">State</label>
                                <input type="text" className="form-control" {...register('state', { required: 'field is required' })}/>
                                {errors.state && <div className='text-danger'>{errors.state.message}</div>}
                            </div>
                            <div className="form-input mb-3">
                                <label htmlFor="">Country</label>
                                <input type="text" className="form-control" {...register('country', { required: 'field is required' })}/>
                                {errors.country && <div className='text-danger'>{errors.country.message}</div>}
                            </div>
                        </form>
                    </div>

                    <div className="col-md-6">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                       Cart Items
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="card border-0 cart-bottom">
                                            <div className="card-body">
                                                <div className="table responsive mt-5">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope='col'>#</th>
                                                                <th scope='col'>Image</th>
                                                                <th scope='col'>Name</th>
                                                                <th scope='col'>Quantity</th>
                                                                <th scope='col'>Price</th>
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
                                                                <td>&#8358;{res.product.price * res.quantity}</td>
                                                             </tr>
                                                        }
                                                        )}

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        {request === true && <span className='spinner-border spinner-border-sm'></span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 cart-bottom mt-5">
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
                                              <img src={'https://libracin.com/wp-content/uploads/2020/01/cards.png'} alt={''} title={undefined} className={'w-50'}></img>
                                               <button type="submit" className='btn btn-primary btn-lg btn-block w-100 mt-4' disabled={requestCheckout}> {requestCheckout === true && <span className='spinner-border spinner-border-sm'></span>} Checkout</button>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <Toaster></Toaster>
    </div>
  )
}

export default Checkout

if (document.getElementById('checkout')) {
  const doc:any = document.getElementById('checkout')
  const Index = ReactDOM.createRoot(doc)

  Index.render(
        <React.StrictMode>
            <Checkout/>
        </React.StrictMode>
  )
}
