import React, {useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import {useSelector, connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { API_URL, BACKEND_URL } from '../../utils/config';
import {getCartItem, cartQuantityChange, removeItem, removeAll, userInfo, switchPaymentPage, paymentModal, backToPrevPage} from '../Store/Action/cart';

const Cart = ({cartItem, setCartQuantity, removeItemFromCart, cartClear, setUserInfo, setPageBack, setPageSwitch, setPayModal}) => {    
    const history = useHistory();
    const {userId, authBoolean} = useSelector(state => state.auth);
    const {cart, totalPrice, userInfo, cartBoolean} = useSelector(state => state.cart);
    
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    let convertMonth = "";
    switch(month){
        case 1:
            convertMonth = "January";
            break;
        case 2:
            convertMonth = "February";
            break;
        case 3:
            convertMonth = "March";
            break;
        case 4:
            convertMonth = "April";
            break;
        case 5:
            convertMonth = "May";
            break;
        case 6:
            convertMonth = "June";
            break;
        case 7:
            convertMonth = "July";
            break;
        case 8:
            convertMonth = "August";
            break;
        case 9:
            convertMonth = "September";
            break;
        case 10:
            convertMonth = "October";
            break;
        case 11:
            convertMonth = "November";
            break;
        case 12:
            convertMonth = "December";
            break;
        default:
            break;
    }
    const date = new Date().getDate();
    const orderDate = `${convertMonth} ${date}, ${year}`

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

    const closePayModal = () => {
        setPayModal(false)
        setPageSwitch(false)
    }

    const handlePaymentModal = async() => {
        !authBoolean.isLogin ?
            Toast.fire({
                icon: 'error',
                html: "Please login before checkout",
                timer: 1000
            }).then((res) => {
                if(res.isDismissed){
                    history.push('/sign')
                }
            })
        :
        setPayModal(true)
    }

    const getTPDirect = () => {
        return new Promise((resolve, reject) => {
            if(typeof window.TPDirect !== 'undefined'){
                return resolve(window.TPDirect)
            }else{
                const script = window.document.createElement('script')
                script.src = process.env.REACT_APP_TAPPAY
                script.async = true
                script.id = "tappay"
                script.onload = async() => {
                    if(typeof window.TPDirect !== 'undefined'){
                        return resolve(window.TPDirect)
                    }else{
                        reject("failed to load TapPay sdk")
                    }
                }
                script.onerror = reject
                window.document.body.appendChild(script);
            }
        })
    }

    const switchToCheckOut = async() => {
        // 新增回上一步功能
        const {name, email, phone, address} = userInfo;
        const englishName = name.match(/^[A-Z|a-z]*$/);
        const chineseName = name.match(/[\u4e00-\u9fa5]{2,}/g);
        const emailCheck = email.match(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/);
        const phoneCheck = phone.match(/^[\d]*$/);
        const englishWordLength = englishName && englishName.toString().length;
        const chineseWordLength = chineseName && chineseName.toString().length;
        const phoneLength = phoneCheck && phoneCheck.toString().length;
        // 檢查下面condition
        if( (chineseWordLength < 2 && chineseName !== null)
        || (englishWordLength < 2 && englishName !== null)
        || name === ""
        || emailCheck === null
        || address === ""
        || phoneLength > 10 
        || phoneLength < 6
        ){
            setPageSwitch(false)
            Toast.fire({
                icon: 'error',
                html: "Some input field is empty or input type is wrong",
                timer: 1000
            })
        }else{
            setPageSwitch(true)
            try {
                const tappaySetup = await getTPDirect();
                tappaySetup.setupSDK(125168, 'app_lkw3XKMVpxhoEscTdoZjknByLoi0SoZI41SoeUBGX3330UocatKCb1qDjQYU', 'sandbox');
                tappaySetup.card.setup({
                    fields:{
                        number: {
                            element: '#card-number',
                            placeholder: '**** **** **** ****'
                        },
                        expirationDate: {
                            // DOM object
                            element: document.getElementById('card-expiration-date'),
                            placeholder: 'MM / YY'
                        },
                        ccv: {
                            element: '#card-ccv',
                            placeholder: 'Last 3 digit (Amex is Last 4 digit)'
                        }
                    }
                })
            } catch (error) {
                console.error("Something wrong")
            }
        }
    }

    const handleCheckOut = async() => {
        try {
            const tappaySetup = await getTPDirect();
            tappaySetup.card.onUpdate((update) => {
                if(update.status.number > 0){
                    // 0	欄位已填好，並且沒有問題
                    // 1	欄位還沒有填寫
                    // 2	欄位有錯誤，此時在 CardView 裡面會用顯示 errorColor
                    // 3	使用者正在輸入中
                }else if(update.status.expiry > 0){
                    // 0	欄位已填好，並且沒有問題
                    // 1	欄位還沒有填寫
                    // 2	欄位有錯誤，此時在 CardView 裡面會用顯示 errorColor
                    // 3	使用者正在輸入中
                }else if(update.status.ccv > 0){
                    // 0	欄位已填好，並且沒有問題
                    // 1	欄位還沒有填寫
                    // 2	欄位有錯誤，此時在 CardView 裡面會用顯示 errorColor
                    // 3	使用者正在輸入中
                }
            })

            const tappayStatus = tappaySetup.card.getTappayFieldsStatus();
            if(tappayStatus.canGetPrime === false){
                Toast.fire({
                    icon: 'error',
                    html: "Payment info is wrong, please try again."
                })
            }else{
                tappaySetup.card.getPrime(async(result) => {
                    if(result.msg !== "Success"){
                        console.log(result.msg)
                    }else{
                        // 將商品細節傳給tappay
                        const sendPrime = await axios.post(`${BACKEND_URL}/pay-by-prime`, {prime: result.card.prime, amount: totalPrice, userInfo}, {withCredentials: true})
                        if(sendPrime.data.result.msg === "Success"){
                            const newOrder = await axios.post(`${API_URL}/order/new`, {userId, cart, card_issuer: sendPrime.data.result.card_info.type, card_number: sendPrime.data.result.card_info.last_four, userInfo, orderDate, totalPrice}, {withCredentials: true});
                            if(newOrder.data.code < 30000 && newOrder.status === 200){
                                Swal.fire({
                                    icon: 'success',
                                    html: newOrder.data.message,
                                    showConfirmButton: true,
                                    confirmButtonText: 'OK',
                                }).then((result) => {
                                    if(result.isConfirmed){
                                        history.push(`/order/user?id=${userId}`);
                                        setPayModal(false)
                                    }
                                })
                                cartClear();
                            }else{
                                Toast.fire({
                                    icon: 'error',
                                    html: newOrder.data.message,
                                })
                            }
                        }else{
                            Toast.fire({
                                icon: 'error',
                                html: sendPrime.data.message,
                            })
                        }
                    }
                })
            }
        } catch (error) {
            console.error("Something went wrong")
        }
    }

    useEffect(()=>{
        cartItem();
    }, [setCartQuantity])

    useEffect(() => {
        getTPDirect()
    }, [])

    return (
        <>
        <Modal
            show={cartBoolean.payModal}
            onHide={closePayModal}
            contentClassName={cartBoolean.payModal ? "c-modal-dialogname in cart-padding" : "c-modal-dialogname out cart-padding"}
            backdropClassName={cartBoolean.payModal ? "c-modal-backdrop in" : "c-modal-backdrop out"}
            animation={false}
            centered
        >   
        <div className="c-modal-payment mb-4">
            <h1 className="text-center mb-3 ">{!cartBoolean.pageSwitch ? "Checkout Info" :"Payment Info"}</h1>
            <div className="mb-3">
                <label htmlFor="card-number" className="mb-2">{!cartBoolean.pageSwitch ? "Name" :"Card Number"}</label>
                {!cartBoolean.pageSwitch ?
                    <input type="text" className="form-control" name="name" value={userInfo.name} onChange={(e) => setUserInfo(e.target.name, e.target.value)} placeholder="English or Chinese Name"/>
                    :
                    <div className="tpfield form-control" id="card-number"></div>
                }
            </div>
            {!cartBoolean.pageSwitch &&
                <div className="mb-3">
                    <label htmlFor="card-number" className="mb-2">Email</label>
                    <input type="email" className="form-control" name="email" value={userInfo.email} onChange={(e) => setUserInfo(e.target.name, e.target.value)} placeholder="Email Address"/>
                </div>
            }
            <div className="mb-3">
                <label htmlFor="card-expiration-date" className="mb-2">{!cartBoolean.pageSwitch ? "Address" :"Expiration Date"}</label>
                {!cartBoolean.pageSwitch ?
                    <input type="text" className="form-control" name="address" value={userInfo.address} onChange={(e) => setUserInfo(e.target.name, e.target.value)} placeholder="Home Address"/>
                    :
                    <div className="tpfield form-control" id="card-expiration-date"></div>
                }
            </div>
            <div className="mb-3">
                <label htmlFor="card-ccv" className="mb-2">{!cartBoolean.pageSwitch ? "Phone Number" :"CVV"}</label>
                {!cartBoolean.pageSwitch ?
                    <input type="number" className="form-control" name="phone" value={userInfo.phone} onChange={(e) => setUserInfo(e.target.name, e.target.value)} placeholder="Phone Number is 8~10 Digit"/>
                    :
                    <div className="tpfield form-control" id="card-ccv"></div>
                }
            </div>
        </div>
        {
            cartBoolean.pageSwitch ? 
            <div className="d-flex">
                <button className="btn btn-primary me-2 w-100" id="back-btn" onClick={() => setPageBack(false)}>Go Back</button>
                <button className="btn btn-primary w-100" id="pay-btn" onClick={handleCheckOut}>Go To Checkout</button>
            </div>
            :
            <button className="btn btn-primary w-100" id="pay-btn" onClick={switchToCheckOut}>Next</button>
        }
        </Modal>
        {(cart.length === 0) ? 
        <div className="c-cart__empty">
            <h3>Your cart is empty.</h3>
            <Link to="/" className="e-return">
                <button className="e-return__btn">Back To Home</button>
            </Link>
        </div>
        :
        <div className="c-cart container">
            <div className="c-cart__head">
                <p className="e-cart__item">My Cart</p>
                <p className="e-cart__qty">Quantity</p>
                <p className="e-cart__price">Price</p>
                <p className="e-cart__remove">Remove</p>
            </div>
            {cart.map((item, i) => (
                <div className="c-cart__item" key={i}>
                    <div className="c-detail">
                        <div className="c-detail__describe">
                            <div className="c-describe__image">
                                <img src={item.hoverImage} alt="product" className="e-cart__image"/>
                            </div>
                            <div className="c-describe__description">
                                <h6 className="e-item__name">{item.name}</h6>
                                <p className="e-item__option">{item.size ? `Size: ${item.size}` : item.waist && item.length ? `Size: ${item.waist} x ${item.length}` : null}</p>
                                <p>{item.color ? `Color: ${item.color}` : null}</p>
                            </div>
                        </div>
                        <div className="c-detail__qty">
                            {(item.quantity <= 1) ?
                                <button className="e-qty__minus" id="minus" onClick={(e)=>setCartQuantity(item, e.target.id)} disabled>
                                    <i className="fas fa-minus-square" id="minus"></i>
                                </button>
                            :
                                <button className="e-qty__minus" id="minus" onClick={(e)=>setCartQuantity(item, e.target.id)}>
                                    <i className="fas fa-minus-square" id="minus"></i>
                                </button>
                            }   
                            <input type="number" value={item.quantity} className="e-qty__amount" min={1} max={10} readOnly/>
                            {(item.quantity >= 10) ?
                                <button className="e-qty__plus" id="plus" onClick={(e)=>setCartQuantity(item, e.target.id)} disabled>
                                    <i className="fas fa-plus-square" id="plus"></i>
                                </button>
                            :
                                <button className="e-qty__plus" id="plus" onClick={(e)=>setCartQuantity(item, e.target.id)}>
                                    <i className="fas fa-plus-square" id="plus"></i>
                                </button>
                            }
                        </div>
                        <div className="c-detail__price">
                            <div>
                                {item.discount !== "1" &&
                                    <p className="old-price">${Math.ceil(item.price * item.quantity) * 30}</p>
                                }
                                <p>${Math.ceil(item.price * item.quantity * item.discount) * 30}</p>
                            </div>
                        </div>
                        <div className="c-detail__remove">
                            <button className="e-remove__btn" onClick={()=>removeItemFromCart(item)}>X</button>
                        </div>
                    </div>
                        <hr/>
                </div>
            ))}
            <div className="c-cart__total">
                <div className="c-price-display">
                    <p>Items:</p>
                    <p>${Math.ceil(cart.reduce((prev, next) => prev + next.quantity * next.price, 0)) * 30}</p>
                </div>
                <div className="c-price-display">
                    <p>Discount:</p>
                    <p className="text-danger">-${Math.ceil(cart.reduce((prev, next) => prev + next.quantity * next.price, 0)) * 30 - totalPrice}</p>
                </div>
                <div className="c-price-display">
                    <p>Order Total:</p>
                    <p>${totalPrice}</p>
                </div>
            </div>
            <div className="c-cart__checkout">
                <button className="e-pay__btn" onClick={handlePaymentModal} role="link">Pay Now</button>
            </div>
            <div className="c-cart__reminder">
                <p>Please using the following test credit card for payment</p>
                <p>Card Number - Date(MM/YY) - CVV Code</p>
                <p>4242 4242 4242 4242 - 01/23 - 123 -&gt; Visa</p>
                <p>5451 4178 2523 0575 - 01/23 - 123 -&gt; Master</p>
                <p>3543 9234 8838 2426 - 01/23 - 123 -&gt; JCB</p>
                <p>3454 5465 4604 563 - 01/23 - 1234 -&gt; Amex</p>
            </div>
        </div>
        }
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        cartItem: () => dispatch(getCartItem()),
        setCartQuantity: (item, id) => dispatch(cartQuantityChange(item, id)),
        removeItemFromCart: (item) => dispatch(removeItem(item)),
        cartClear: () => dispatch(removeAll()),
        setUserInfo: (name, value) => dispatch(userInfo(name, value)),
        setPageBack: (status) => dispatch(backToPrevPage(status)),
        setPageSwitch: (status) => dispatch(switchPaymentPage(status)),
        setPayModal: (status) => dispatch(paymentModal(status)),
    }
}

export default connect(null, mapDispatchToProps)(Cart);
