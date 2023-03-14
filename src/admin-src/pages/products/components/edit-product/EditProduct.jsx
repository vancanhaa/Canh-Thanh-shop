import React from 'react'
import { useParams } from 'react-router-dom'
import ProductForm from '../product-form/ProductForm'
import "./edit-product.scss"
function EditProduct() {

    const { idProduct } = useParams()
    console.log(idProduct);
    
    return (
    <div className='edit-product'>
        <ProductForm />
        <div className="edit-product__btn-wrap">
            <button className="edit-product__btn btn--save" >Lưu</button>
            <button className="edit-product__btn btn--reset">Đặt lại</button>
            <button className="edit-product__btn btn--delete">Xóa</button>
        </div>
    </div>
  )
}

export default EditProduct