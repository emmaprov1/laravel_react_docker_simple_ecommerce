import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './OrdersDetails.scss'
import toast, { Toaster } from 'react-hot-toast'
import { orderService } from '../../service/orderService'
import { TimeConverter } from '../../Helpers/TimeConverter'

const OrdersDetails = () => {
  const [data, setData] = useState<any>({})
  const [request, setRequest] = useState(false)

  const [totalCost, setTotalCost] = useState(0)

  const transactionId = window.location.pathname.split('/')[2]

  const getOrder = async () => {
    setRequest(true)

    await orderService.details(transactionId).then((res) => {
      setData(res.data.data)
      setRequest(false)
    }, error => {
      setRequest(false)
      toast.error(error.response.data.message, { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })
    })
  }

  useEffect(() => {
    request === false && getOrder()
  }, [])

  const getTotal = () => {
    let total = 0

    data?.all_cart_product?.filter((res:any) => {
      total += (res.product.price * res.quantity)
      return true
    })

    setTotalCost(total)
  }

  useEffect(() => {
    getTotal()
  }, [data])

  const updateStatus = async (e: { target: { value: string; }; }) => {
    const loader = toast.loading('Updating order...')
    await orderService.updateStatus({ status: e.target.value, transactionId }).then((res) => {
      console.log('cartService', res)
      toast.dismiss(loader)
      getOrder()
      toast.success('Order updated', { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })
    },
    error => {
      console.log('error', error.response)
      toast.dismiss(loader)
      toast.error(error.response.data.message, { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })
    })
  }
  return (
        <div className='ordersDetails'>
            <div className="container">
                <h2>
                    Inventory
                </h2>

                <div id="inventory-invoice">
                    <div className="toolbar hidden-print row pb-2">
                        <div className="text-right col-md-9">
                            <a href="/orders">
                                <button className="btn btn-info"><i className="fa fa-file-pdf-o"></i> Back</button>
                            </a>
                        </div>
                        <div className="text-left col-md-3 text-end mb-3">
                             <select name="" id="" className='form-control' onChange={updateStatus}>
                                <option value="1">Completed</option>
                                <option value="0">Pending</option>
                             </select>
                        </div>
                        <hr/>
                    </div>
                    <div className="invoice overflow-auto">
                        <div style={{ minWidth: '600px' }}>
                            <header>
                                <div className="row">
                                    <div className="col">
                                    </div>
                                    <div className="col company-details">
                                        <h2 className="name">
                                             {data?.user?.name}
                                        </h2>
                                        <div>{data.user?.email}</div>
                                        <div>{data.delivery_address}</div>
                                        <div>{data.state}</div>
                                        <div>{data.country}</div>
                                    </div>
                                </div>
                            </header>
                            <div className='main'>
                                <div className="row contacts">
                                    <div className="col invoice-details">
                                        <div className="date">Transaction Date: {TimeConverter(data?.created_at)}</div>
                                        <div className="date">Transaction ID: <b>{data.transaction_id}</b></div>
                                        <div className="date">Payment Status: <b className='text-danger fw-bolder'>{data.payment_status}</b></div>
                                        <div className="date">Order Status: {Number(data.completed_status) === 1 ? <b className="text-success fw-bolder">Completed</b> : <b className="text-danger fw-bolder">Pending</b>}</div>
                                    </div>
                                </div>
                                <table border={0} cellSpacing={0} cellPadding="0">
                                    <thead>
                                        <tr>
                                            <th>Item NO.</th>
                                            <th className="text-left">DESCRIPTION</th>
                                            <th className="text-right">PRICE</th>
                                            <th className="text-right">QUANTITY</th>
                                            <th className="text-right">TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {request === false && data?.all_cart_product?.length > 0 && data.all_cart_product.map((res: any, index:React.Key) => <tr key={index}>
                                            <td className="no">{Number(index) + 1}</td>
                                            <td className="text-left">{res.product.name}</td>
                                            <td className="unit"> &#8358;{res.product.price}</td>
                                            <td className="tax">{res.quantity}</td>
                                            <td className="total">&#8358;{res.product.price * res.quantity}</td>
                                        </tr>)}
                                          {request === true && <tr>
                                            <td colSpan={5}>
                                                  <span className='spinner-border spinner-border-sm'></span>
                                            </td>
                                          </tr> }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={2}></td>
                                            <td colSpan={2}>SUBTOTAL</td>
                                            <td>&#8358;{totalCost}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}></td>
                                            <td colSpan={2}>TAX 0%</td>
                                            <td> &#8358;00.00</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}></td>
                                            <td colSpan={2}>TOTAL</td>
                                            <td>&#8358;{totalCost}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <footer>
                                &copy; Lifepage.com
                            </footer>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
            <Toaster></Toaster>
        </div>
  )
}

export default OrdersDetails

if (document.getElementById('orders-detail')) {
  const doc:any = document.getElementById('orders-detail')
  const Index = ReactDOM.createRoot(doc)

  Index.render(
        <React.StrictMode>
            <OrdersDetails/>
        </React.StrictMode>
  )
}
