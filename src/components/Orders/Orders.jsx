import React, { useState } from 'react';
import Card from '../Card/Card';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const saveCart = useLoaderData()
    // console.log(product)
    const [cart, setCart] = useState(saveCart)

    const handleRemoveFromCart = (id) =>{
        const reamining = cart.filter(product => product.id !== id)
        setCart(reamining)
        removeFromDb(id)
    }

    const handleClearCart =()=>{
        setCart([])
        deleteShoppingCart()
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
            <Card 
            cart={cart}
            handleClearCart={handleClearCart}
            >
                <Link className='proced-link' to="/checkout">
                    <button className='btn-proced'>Proced checkout</button>
                </Link>
            </Card>
        </div>
        </div>
    );
};

export default Orders;