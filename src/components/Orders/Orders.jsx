import React, { useState } from 'react';
import Card from '../Card/Card';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const saveCart = useLoaderData()
    // console.log(product)
    const [cart, setCart] = useState(saveCart)

    const handleRemoveFromCart = (id) =>{
        const reamining = cart.filter(product => product.id !== id)
        setCart(reamining)
        removeFromDb(id)
    }
    return (
        <div className='shop-container'>
        <div className='review-container'>
        {
            cart.map(product=> <ReviewItem
            key={product.id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}
            ></ReviewItem>)
        }
        </div>
        <div className='cart-container'>
            <Card cart={cart}></Card>
        </div>
        </div>
    );
};

export default Orders;