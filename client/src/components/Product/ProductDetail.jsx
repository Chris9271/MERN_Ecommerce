import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import {useSelector, connect} from 'react-redux';
import {showChartModal, getOptions, updateQuantity} from '../Store/Action/page';
import {cartQuantityChange} from '../Store/Action/cart';

const ProductDetail = ({showChart, closeChart, selectOption, selectSecondOption, addQuantity, minusQuantity, setLocalStorage}) => {
    const {item, pageBoolean} = useSelector(state => state.page);
    const {itemToCart} = useSelector(state => state.cart);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    })

    const addToCart = async(e) => {
        e.preventDefault();
        if(
            ((item[0].waist.length > 0 && item[0].length.length > 0) && (itemToCart.waist !== "" && itemToCart.length !== ""))
        || ((item[0].size.length > 0 && item[0].color.length > 0) && (itemToCart.size !== "" && itemToCart.color !== "")) 
        || ((item[0].color.length > 0 && item[0].size.length === 0) && itemToCart.color !== "")
        || ((item[0].size.length > 0 && item[0].color.length === 0) && itemToCart.size !== "")
        ){
            // 存localStorage
            setLocalStorage(itemToCart, e.target.id);
        }else{
            Toast.fire({
                icon: 'error',
                html: "Please select option"
            })
        }
    }

    return (
        <div className="c-product-detail">
            <Modal
                show={pageBoolean.showChartModal}
                onHide={closeChart}
                contentClassName={pageBoolean.showChartModal ? "c-modal-dialogname in" : "c-modal-dialogname out"}
                backdropClassName={pageBoolean.showChartModal ? "c-modal-backdrop in" : "c-modal-backdrop out"}
                animation={false}
                centered
            >
                <img src="https://cdn.shopify.com/s/files/1/1380/3157/files/168293_original_1-2_2048x2048.png?v=1474813445" alt="" className="e-modal-image"/>   
            </Modal>
            <div className="c-detail">
                <h4 className="c-detail__name">{item[0].name}</h4>
                {
                    item[0].sale ? 
                    <h5 className="c-detail__price">Price: 
                        <span className="sale-price"> ${Math.round(item[0].price * item[0].discount) * 30}</span>
                        <span className="old-price"> ${Math.round(item[0].price) * 30}</span>
                    </h5> 
                    :
                    <h5 className="c-detail__price">Price: ${Math.round(item[0].price) * 30}</h5>
                }
                <p className="c-detail__description">{item[0].description}</p>
            </div>
            <div className="c-select">
                <div className="c-select-title">
                    <h6>Select Size</h6>
                    <div className="c-chart" onClick={showChart}>
                        <i className="fas fa-ruler-horizontal c-chart__icon"></i>
                        <span>Size Chart</span>
                    </div>
                </div>
                <div className="c-select-option">
                    {
                        item[0].size.length > 0 ? 
                        <>
                            <h6 className="c-select-option__title">Size</h6>
                            <ul className="c-select-option__list">
                                {
                                    item[0].size.map((res) => (
                                        <li className="c-select-option__item" key={res} value={res}>
                                            <button name="size" className={itemToCart.size === res ? "c-select-option__btn selected" : "c-select-option__btn"} onClick={(e) => selectOption(e.target.name, res)}>
                                                {res}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                        :
                        item[0].waist.length > 0 ? 
                        <>
                            <h6 className="c-select-option__title">Waist</h6>
                            <ul className="c-select-option__list">
                                {
                                    item[0].waist.map((res) => (
                                        <li className="c-select-option__item" key={res} value={res}>
                                            <button name="waist" className={itemToCart.waist === res ? "c-select-option__btn selected" : "c-select-option__btn"} onClick={(e) => selectOption(e.target.name, res)}>
                                                {res}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                        :
                        null
                    }                                    
                </div>
                {
                    item[0].length.length > 0 ?
                    <div className="c-select-option">
                        <h6 className="c-select-option__title">Length</h6>
                        <ul className="c-select-option__list">
                            {
                                item[0].length.map((res) => (
                                    <li className="c-select-option__item" key={res} value={res}>
                                        <button name="length" className={itemToCart.length === res ? "c-select-option__btn selected" : "c-select-option__btn"} onClick={(e) => selectSecondOption(e.target.name, res)}>
                                            {res}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    : 
                    item[0].color.length > 0 ?
                        <div className="c-select-option">
                            <h6 className="c-select-option__title">Color</h6>
                            <ul className="c-select-option__list">
                                {
                                    item[0].color.map((res) => (
                                        <li className="c-select-option__item" key={res} value={res}>
                                            <button name="color" className={itemToCart.color === res ? "c-select-option__btn selected" : "c-select-option__btn"} onClick={(e) => selectSecondOption(e.target.name, res)}>
                                                {res}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    :
                    null
                }
                <div className="c-quantity">
                    <h6 className="c-quantity__title">Select Quantity</h6>
                    <div className="c-quantity-amount">
                    {
                        itemToCart.quantity === 1 ? 
                        <button className="c-quantity-amount__minus" name="minus" onClick={(e) => minusQuantity(e.target.name)} disabled>
                        </button>
                        :
                        <button className="c-quantity-amount__minus" name="minus" onClick={(e) => minusQuantity(e.target.name)}>
                        </button>
                    }
                    <input type="number" className="c-quantity-amount__number" min={1} max={10} value={itemToCart.quantity} readOnly/>
                    {   
                        itemToCart.quantity === 10 ?
                        <button className="c-quantity-amount__plus" name="add" onClick={(e) => addQuantity(e.target.name)} disabled>
                        </button>
                        :
                        <button className="c-quantity-amount__plus" name="add" onClick={(e) => addQuantity(e.target.name)}>
                        </button>
                    }
                    </div>
                </div>
            </div>
            <button className="e-cart__button" id="add" onClick={(e) => addToCart(e)}>
                <i className="fas fa-shopping-cart e-cart__button-icon" id="add"></i>
                <span>Add To Cart</span>
            </button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        showChart: () => dispatch(showChartModal(true)),
        closeChart: () => dispatch(showChartModal(false)),
        selectOption: (name, value) => dispatch(getOptions(name, value)),
        selectSecondOption: (name, value) => dispatch(getOptions(name, value)),
        addQuantity: (name) => dispatch(updateQuantity(name)),
        minusQuantity: (name) => dispatch(updateQuantity(name)),
        setLocalStorage: (itemToCart, id) => dispatch(cartQuantityChange(itemToCart, id)),
    }
}

export default connect(null, mapDispatchToProps)(ProductDetail);