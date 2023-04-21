import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './Customers.scss'
import toast, { Renderable, Toast, Toaster, ValueFunction } from 'react-hot-toast'
import { customerService } from '../../service/customerService'
import { useForm } from 'react-hook-form'

export type registerFormProps = {
    email: string;
    name: string;
    password: string;
}

const Customers = () => {
  const [data, setData] = useState([])
  const [request, setRequest] = useState(false)
  const [requestReg, setRequestReg] = useState(false)

  const closeModalBtn = useRef<any>()

  const getUser = async () => {
    setRequest(true)

    await customerService.index().then((res) => {
      console.log('console', res.data.data)
      setData(res.data.data)
      setRequest(false)
    }, (error: { response: any }) => {
      setRequest(false)
      console.log('error', error.response)
    })
  }

  useEffect(() => {
    request === false && getUser()
  }, [])

  const deleteItem = async (id:number) => {
    const loader = toast.loading('Removing customer...')
    await customerService.remove(id).then((res: any) => {
      console.log('checkout', res)
      toast.dismiss(loader)
      toast.success('User deleted', { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })

      closeModalBtn.current.click()

      setTimeout(() => {
        getUser()
      }, 300)
    }, (error: { response: any; message: Renderable | ValueFunction<Renderable, Toast>; }) => {
      console.log('error', error.response)
      toast.dismiss(loader)
      toast.error(error.message, { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })
    })
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm<registerFormProps>()

  const submit = async (data: registerFormProps) => {
    setRequestReg(true)
    await customerService.create(data).then((res: any) => {
      toast.success('Customer Created', { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })

      setRequestReg(false)
      reset()
      setTimeout(() => {
        getUser()
      }, 300)
    }, (error: { response: any; message: Renderable | ValueFunction<Renderable, Toast>; }) => {
      console.log('error', error.response)
      setRequestReg(false)
      toast.error(error.response.data.message, { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })
    })
  }

  return (
        <div className='customers'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>
                            Customer
                        </h2>
                    </div>
                    <div className="col-md-6 text-end">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                             Create customer
                        </button>
                    </div>
                </div>
                <div className="card border-0 cart-bottom">
                    <div className="card-body">
                        <div className="table responsive mt-5">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Orders</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                {request === false && data.map((res:any, index:React.Key) => {
                                  return <tr key={index}>
                                        <td>{res.user.id}</td>
                                        <td>{res.user.name}</td>
                                        <td>{res.user.email}</td>
                                        <td>{res.order_count}</td>
                                        <td>
                                            <button className="btn bg-danger btn-sm text-white me-2" onClick={() => deleteItem(res.user.id)}>Delete</button>
                                            <a href={`/customer/orders/${res.user.id}`}><button className="btn bg-primary btn-sm text-white">View Orders</button></a>
                                        </td>
                                    </tr>
                                }
                                )}

                                {request === false && data.length === 0 && <tr>
                                    <td colSpan={6} className='text-center'>
                                        No customer found
                                    </td>
                                </tr>}

                            </table>
                        </div>
                    </div>
                </div>
             {request === true && <span className='spinner-border spinner-border-sm'></span>}

            </div>

                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create new customer</h5>
                        <button type="button" className="btn-close" ref={closeModalBtn} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit((data) => submit(data))}>
                            <div className='form-input'>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" className="form-control" {...register('name', { required: 'field is required' })}/>
                                {errors.name && <div className='text-danger'>{errors.name.message}</div>}
                            </div>
                            <div className='form-input mt-3'>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" className="form-control" {...register('email', { required: 'field is required' })}/>
                                {errors.email && <div className='text-danger'>{errors.email.message}</div>}
                            </div>
                            <div className='form-input mt-3'>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" className="form-control" {...register('password', { required: 'field is required' })}/>
                                {errors.password && <div className='text-danger'>{errors.password.message}</div>}
                            </div>
                            <div className='form-input mt-3'>
                                {requestReg === false && <button type="submit" className="btn btn-primary">Create</button>}
                                {requestReg === true && <button type="submit" className="btn btn-primary"><span className='spinner-border spinner-border-sm'></span> Please wait...</button>}
                             </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            <Toaster></Toaster>
        </div>
  )
}

export default Customers

if (document.getElementById('customer')) {
  const doc:any = document.getElementById('customer')
  const Index = ReactDOM.createRoot(doc)

  Index.render(
        <React.StrictMode>
            <Customers/>
        </React.StrictMode>
  )
}
