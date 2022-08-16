import React, {useEffect} from 'react';
import {useSelector, connect} from 'react-redux';
import { Redirect } from 'react-router';
import {getOrder} from '../Store/Action/page';
const Order = ({historyOrder}) => {
    const {orders} = useSelector(state => state.page);
    const {authBoolean} = useSelector(state => state.auth);
    // userId - new URLSearchParams(window.location.search).toString()
    // 透過userId 去找到相應訂單顯示在此頁面中
    const paramsUserId = new URLSearchParams(window.location.search).toString().split('=')[1];
    
    useEffect(() => {
        historyOrder(paramsUserId);
    }, [])

    if(!authBoolean.isLogin || paramsUserId === undefined) return <Redirect to="/"/>

    return (
        <>
            {orders.length === 0 ?
                <div className="c-empty">
                    <img className="empty-img" src={require("../../images/empty.svg").default} alt="no result"/>
                    <h5 className="empty-title">You don't have any order</h5>
                </div>
                :
                orders.map((orderList, index) => (
                <div className="c-order container" key={index}>
                    <div className="c-order__header">
                        <div className="c-order__header-container">
                            <p className="c-order__header-container-title">ORDER PLACED</p>
                            <p>{orderList.order_date}</p>
                        </div>
                        <div className="c-order__header-container">
                            <p className="c-order__header-container-title">TOTAL</p>
                            <p>${orderList.order_total}</p>
                        </div>
                        <div className="c-order__header-container">
                            <p className="c-order__header-container-title">SHIP TO</p>
                            <p>{orderList.name}</p>
                        </div>
                        <div className="c-order__header-container">
                            <p className="c-order__header-container-title">ORDER # {orderList._id}</p>
                        </div>
                    </div>
                    <div className="c-order__content container">
                        <div className="c-order__content-container">
                            {
                                orderList.products.map((item, index) => (
                                    <div className="c-order-show" key={index}>
                                        <div className="c-order-image">
                                            <img src={item[0].product.hoverImage} alt="item_image" className="e-image"/>
                                        </div>
                                        <div className="c-order-describe">
                                            <h6 className="e-title-describe">{item[0].product.name}</h6>
                                            <p> 
                                                {
                                                    item[0].product.discount !== "1" ?
                                                    <>
                                                        <span className="e-price-describe">Price: ${Math.round(item[0].product.price * item[0].product.discount) * 30}</span>
                                                        <span className="e-oldprice-describe">${Math.round(item[0].product.price) * 30}</span>
                                                    </>
                                                    :
                                                    <span>Price: ${Math.round(item[0].product.price) * 30}</span>
                                                }
                                            </p>
                                            {item[0].size ?
                                                <p>Size: {item[0].size}</p>
                                            :
                                            item[0].waist && item[0].length ?
                                                <p>Size: {item[0].waist} x {item[0].length}</p>
                                            : null
                                            }
                                            {item[0].color && <p>Color: {item[0].color}</p>}
                                            <p>Qty: {item[0].quantity}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="c-order__payment">
                            <div className="c-order__payment-container">
                                <div className="c-payment">
                                    <h5 className="e-title">Payment Info</h5>
                                    <i className={`fab fa-cc-${orderList.card_issuer.toLowerCase()}`}></i>
                                </div>
                                <p className="e-content">Ending: {orderList.card_number}</p>
                                <p className="e-content">{orderList.name}</p>
                                <p className="e-content">{orderList.address}</p>
                                <p className="e-content">{orderList.phone}</p>
                            </div>
                            <div className="c-order__payment-shipping">
                                <h5 className="e-title">Shipping Address</h5>
                                <p className="e-content">{orderList.name}</p>
                                <p className="e-content">{orderList.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        historyOrder: (paramsUserId) => dispatch(getOrder(paramsUserId))
    }
}

export default connect(null, mapDispatchToProps)(Order);