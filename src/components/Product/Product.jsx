import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    // console.log(props)
    const {img, name, seller, quantity, price, ratings} = props.product;
    const hadleAddCart = props.hadleAddCart
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
            <h6 className='product-name'>{name}</h6>
            <p>Price: ${price}</p>
            <p>Manufecturer: {seller}</p>
            <p>Rating: {ratings} Stars: </p>
            </div>

            <button className='btn-cart' onClick={()=>hadleAddCart()}>Add to Cart:<FontAwesomeIcon icon={faShoppingCart} />
             </button>
        </div>
    );
};

export default Product;