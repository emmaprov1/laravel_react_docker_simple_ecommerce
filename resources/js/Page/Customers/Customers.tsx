import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './Customers.scss'
import toast, { Renderable, Toast, Toaster, ValueFunction } from 'react-hot-toast'
import { customerService } from '../../service/customerService'

const Customers = () => {
  const [data, setData] = useState([])
  const [request, setRequest] = useState(false)

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

      setTimeout(() => {
        getUser()
      }, 300)
    }, (error: { response: any; message: Renderable | ValueFunction<Renderable, Toast>; }) => {
      console.log('error', error.response)
      toast.dismiss(loader)
      toast.error(error.message, { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })
    })
  }

  return (
        <div className='customers'>
            <div className="container">
                <h2>
                    Customer
                </h2>
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
