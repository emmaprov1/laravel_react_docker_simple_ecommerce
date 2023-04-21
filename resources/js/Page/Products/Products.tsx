import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { productService } from '../../service/productService'
import ImageSrc from '../../components/ImageSrc/ImageSrc'
import './Products.scss'
import { cartService } from '../../service/cartService'
import toast, { Toaster } from 'react-hot-toast'

function Product () {
  const [data, setData] = useState([])
  const [request, setRequest] = useState(false)
  const [quantity, setQty] = useState(1)

  const getAll = async () => {
    setRequest(true)
    await productService.getAll().then((res) => {
      setData(res.data.data)
      setRequest(false)
    }, error => {
      setRequest(false)
      console.log('error', error.response)
    })
  }

  useEffect(() => {
    getAll()
  }, [])

  const addToCart = async (id:number) => {
    const loader = toast.loading('Adding item...')

    await cartService.add({ product_id: id, user_id: window.User.id, quantity }).then((res) => {
      console.log('cartService', res)
      toast.dismiss(loader)
      toast.success('Added to cart', { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })
    },
    error => {
      console.log('error', error.response)
      toast.dismiss(loader)
      toast.error(error.message, { duration: 20000, className: 'bg-white text-dark', position: 'top-right' })
    })
  }

  return (
        <div className="products">
            <div className="container">
                <h2>
                    Products
                </h2>
                <div className="row justify-content-center mt-4">
                    {data.length > 0 && data.map((res:{image:string, name:string, price:number, id:number}, index) => <div key={index} className="col-md-3 mb-3">
                        <div className="card border-0 shadow-sm">
                            <ImageSrc src={res.image} alt={res.name} title={res.name} width={'w-100'}></ImageSrc>
                            <div className="card-header">{res.name}</div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-3">
                                        <div className='fw-bolder'>&#8358;{res.price}</div>
                                    </div>
                                    <div className="col-5">
                                        <input type="number" className='qty form-control' placeholder='Quantity' onChange={(e:any) => setQty(Number(e.target.value))}/>
                                    </div>
                                    <div className="col-4 text-end">
                                        <button className='btn btn-primary btn-sm btn-cart' onClick={() => addToCart(res.id)}>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>

                {request === true && <span className='spinner-border spinner-border-sm'></span>}
            </div>
            <Toaster></Toaster>
        </div>
  )
}

export default Product

if (document.getElementById('products')) {
  const doc:any = document.getElementById('products')
  const Index = ReactDOM.createRoot(doc)

  Index.render(
        <React.StrictMode>
            <Product/>
        </React.StrictMode>
  )
}
