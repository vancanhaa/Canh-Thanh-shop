import React from 'react'
import { useParams } from 'react-router-dom'
import ProductForm from '../product-form/ProductForm'
import "./add-product.scss"
function AddProduct() {

    
    return (
    <div className='add-product'>
        <ProductForm />
        <div className="add-product__btn-wrap">
            <button className="add-product__btn btn--save" >Lưu</button>
            <button className="add-product__btn btn--delete">Xóa</button>
        </div>
    </div>
  )
}

export default AddProduct