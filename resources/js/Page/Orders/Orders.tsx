import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';
import "./Orders.scss"
import { cartService } from '../../service/cartService';
import ImageSrc from '../../components/ImageSrc/ImageSrc';
import toast, { Toaster } from 'react-hot-toast';
import { orderService } from '../../service/orderService';
import { TimeConverter } from '../../Helpers/TimeConverter';

const Orders = () => {
    const [data, setData] = useState([])
    const [request, setRequest] = useState(false)
   

    const getCart = async () => {
      setRequest(true)

      await orderService.index().then((res)=>{

        setData(res.data.data)
        setRequest(false)

      }, error=>{ 

        setRequest(false)
        console.log("error", error.response)
        toast.error(error.response.data.message, { duration: 20000, className: 'bg-white text-dark', position: "top-right" });
      
      })
    }

    useEffect(()=>{
        getCart()
    }, [])
 
    return (
        <div className='cart'>
            <div className="container">
                <h2>
                    Orders
                </h2>
                <div className="card border-0 cart-bottom">
                    <div className="card-body"> 
                        <div className="table responsive mt-5"> 
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Image</th>
                                        <th scope='col'>Transaction ID</th>
                                        <th scope='col'>Items</th>
                                        <th scope='col'>Customer Name</th>
                                        <th scope='col'>Order Time</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                {request === false && data.map((res:any, index:React.Key)=> {
                                    return <tr key={index}>
                                        <td>#{res.id}</td>
                                        <td>
                                            <ImageSrc src={""} alt={""} title={""} width={'cart-product-image'}></ImageSrc>
                                        </td>
                                        <td>{res.transaction_id}</td>
                                        <td>{res.cart_count}</td>
                                        <td>{res.user.name}</td>
                                        <td>{TimeConverter(res.created_at)}</td>
                                        <td>
                                            <a href={`/orders/${res.transaction_id}`}><button className="btn bg-dark btn-sm text-white">View</button></a>
                                        </td>
                                    </tr>} 
                                )} 

                                {request===false && data.length === 0 && <tr>
                                    <td colSpan={6} className='text-center'>
                                        Cart is empty
                                    </td>
                                </tr>}

                            </table>
                        </div>
                    </div>
                </div>
             {request ==true && <span className='spinner-border spinner-border-sm'></span>}
             
            </div>
            <Toaster></Toaster>
        </div>
    )
}

export default Orders

if (document.getElementById('orders')) {
    const doc:any = document.getElementById("orders")
    const Index = ReactDOM.createRoot(doc);

    Index.render(
        <React.StrictMode>
            <Orders/>
        </React.StrictMode>
    )
}
