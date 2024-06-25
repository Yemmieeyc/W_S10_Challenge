import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSizeFilter } from '../state/sizefilterslice'
import { useGetPizzaOrdersQuery } from '../state/pizzaOrderApi'

export default function OrderList() {
  const dispatch = useDispatch()
  const sizeFilter = useSelector((state) => state.sizeFilter)

  const {data: orders = [], isFetching} = useGetPizzaOrdersQuery()
  if(isFetching) return 'Loading...'

  const handleSizeClick = (size) => {
    dispatch(setSizeFilter(size))
  }

 
  return (
      
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.map((order) => {
            return (
              <li key={order.id}>
                <div>
                  <p>Name:{order.fullName}</p>
                  <p>Size:{order.size}</p>
                  <p>Toppings:{order.toppings.length}</p>
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
