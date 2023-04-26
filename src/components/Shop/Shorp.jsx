import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Card from '../Card/Card';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
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
        let newCart = [];
        // const newCart = [...cart, product]
        // if product doesn't exist in the cart, then set quantity = 1;
        // if exists update the quantity by 1
        const exists = cart.find(pd => pd.id ===  product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product];
        }else{
            exists.quantity = exists.quantity + 1;
            const reamining = cart.filter(pd => pd.id !== product.id);
            newCart = [...reamining, exists];
        }

        setCart(newCart)
        addToDb(product.id)
    }

    const handleClearCart =() =>{
        setCart([])
        deleteShoppingCart()
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
                <Card
                 cart={cart}
                 handleClearCart={handleClearCart}
                 >
                    <Link className='proced-link' to="/orders">
                        <button className='btn-proced'>Review Order</button>
                    </Link>
                 </Card>
            </div>
        </div>
    );
};

export default Shorp;