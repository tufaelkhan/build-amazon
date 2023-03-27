import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Product from '../Product/Product';
import './Shop.css'
const Shorp = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart]= useState([])

    useEffect(() =>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    const hadleAddCart = (product) =>{
        // cart.push(product)
        const newCart = [...cart, product]
        setCart(newCart)
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                    key={product.id}
                    product={product}
                    hadleAddCart={hadleAddCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Card cart={cart}></Card>
            </div>
        </div>
    );
};

export default Shorp;