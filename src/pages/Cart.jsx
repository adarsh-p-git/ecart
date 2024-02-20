import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart, removeFromCart } from '../redux/slice/Cartslice'
import { useNavigate } from 'react-router-dom'


function Cart() {
  const cartArray = useSelector(state => state.cartreducer)
  const dispatch = useDispatch()
  const [price, setPrice] = useState(0)
  const navigate = useNavigate()

  const totalPricefn = () => {

    if (cartArray.length > 0) {

      setPrice(cartArray.reduce((a, b) => a + b.price, 0))
    }
    else {
      setPrice(0)
    }



  }
  const handleCart = () => {
    dispatch(emptyCart())
    alert("Thankyou for Shopping with Me")
    navigate('/')
  }
  useEffect(() => {
    totalPricefn()
  }, [cartArray])
  return (
    <div>
      <div className="cartcontainer container-lg" style={{ marginTop: '100px' }}>
        <h1>Shopping Cart</h1>
        {
          cartArray.length > 0 ?

            <div className='row'>
              <div className="col-lg-8 d-flex">
                <div className="table shadow rounded">
                  <Table striped bordered hover>
                    <thead>

                      <th>#</th>
                      <th>product</th>
                      <th>product image</th>
                      <th>price</th>
                      <th>action</th>
                    </thead>
                    <tbody>
                      {
                        cartArray.map((products, index) =>
                        (<tr key={index}>
                          <td>{index + 1}</td>
                          <td>{products.title}</td>
                          <td><img src={products.thumbnail} width={'100px'} height={'100px'} className='img' alt="" /></td>
                          <td>{products.price}</td>
                          <td><Button className='btn btn-light' onClick={() => dispatch(removeFromCart(products.id))} ><i className='fa-solid fa-trash text-danger'></i></Button></td>
                        </tr>


                        ))
                      }
                    </tbody>
                  </Table>
                </div>
                <div className="col-lg-8 m-3">
                  <div className="border mt-3 rounded shadow p-2 w-100">
                    <h1 className="text-primary m-2">Cart Summary</h1>
                    <h4>Total Products: <span>{cartArray.length}</span></h4>
                    <h4>Total: <span className='text-danger fw-bolder fs-2'>$ {price}</span></h4>
                    <div className='d-grid'>
                      <button className='btn btn-success mt-5 rounded' onClick={handleCart }>Check Out</button>
                    </div>

                  </div>
                </div>




              </div>
            </div> : <div className="emptycart text-center">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/your-cart-is-empty-2161427-1815069.png" alt="" />
              <h1>Cart is Empty</h1>
            </div>
        }

      </div>


    </div>
  )
}

export default Cart