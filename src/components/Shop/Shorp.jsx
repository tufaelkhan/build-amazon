import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
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
  
    useEffect(()=>{
        const storedCart = getShoppingCart();
        const saveCart = [];
        // step 1: get id of the addedProduct
        for(const id in storedCart){
            // step 2: get product from products state by using id
            const addedProduct = products.find(product => product.id === id)
            if(addedProduct){
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saved cart
                saveCart.push(addedProduct)
            }
            // console.log('added some product',addedProduct)
        }
        // step 5: set the cart
        setCart(saveCart);
    },[products])

    const hadleAddCart = (product) =>{
        // cart.push(product)
        const newCart = [...cart, product]
        setCart(newCart)

        addToDb(product.id)
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