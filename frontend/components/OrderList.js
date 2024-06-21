import React from 'react'
import { useGetPizzaOrdersQuery } from '../state/pizzaOrderApi'

export default function OrderList() {
  const {data: orders = [], isFetching} = useGetPizzaOrdersQuery()
  if(isFetching) return 'Loading...'
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.map((order) => {
            return (
              <li key={order.id}>
                <div>
                  order details here
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
