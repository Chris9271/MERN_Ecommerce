import React from 'react';
import HoverImage from 'react-hover-image';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Products = () => {
  const {products, pageBoolean} = useSelector(state => state.page);
  
  return (
    <div className="l-products container col-xl-9 col-lg-8 col-12">
        <div className="row gx-3 gx-md-5">
        {
          !pageBoolean.isLoading ? 
          (<div className="c-loading col-xl-4 col-md-6 col-sm-12">
              <div className="c-loading__msg">Loading Products...</div>
              <div className="c-loading__loader"></div>
          </div>)
          :
          products.length > 0 ?
            products.map((product)=>(
              <div className="c-products col-xl-4 col-md-6 col-6" key={product._id}>
                  <div className="c-product__image">
                    <Link to={`/product/${product._id}`}>
                      <HoverImage src={product.image} hoverSrc={product.hoverImage} alt="product" className="c-products__image"/>
                    </Link>
                  </div>
                  <div className="c-products-display">
                    <p className="c-products__name">{product.name}</p>
                    <p className="c-products__description">{product.description}</p>
                    {
                      product.sale ? 
                      <p className="c-products__price c-products__red">${Math.round(product.price * product.discount) * 30}</p>
                      : 
                      <p className="c-products__price">${Math.round(product.price) * 30}</p>
                    }
                  </div>
              </div>
            )) 
            : 
            <div className="c-empty">
              <img className="empty-img" src={require("../../images/empty.svg").default} alt="no result"/>
              <h5 className="empty-title">No Data meets condition</h5>
            </div>
          }
        </div>
    </div>
  )
}

export default Products;