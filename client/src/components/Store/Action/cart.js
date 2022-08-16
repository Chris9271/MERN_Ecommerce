// 取得LocalStorage中所有商品
export const getCartItem = () => {
    return async(dispatch) => {
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('cartList'));
        if(cartFromLocalStorage.length !== 0){
            const sumAmount = cartFromLocalStorage.reduce((prev, next) => {
                return{
                    quantity: prev.quantity + next.quantity
                }
            }, {quantity: 0})
            const sumTotal = cartFromLocalStorage.reduce((prev, next) => {
                return prev + Math.ceil(next.quantity * next.price * next.discount) * 30
            }, 0);
            dispatch({type: "SET_CART", payload: cartFromLocalStorage})
            dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            dispatch({type: "SUM_CART", payload: sumAmount.quantity})
        }
        else{
            dispatch({type: "SET_CART_EMPTY"})
        }
    }
}

// 在Cart頁面或是商品頁點擊加到購物車調整數量(+/-1 or +/-N)
export const cartQuantityChange = (item, id) => {
    return async(dispatch) => {
        // 根據id, size, color, waist, length...等來增加localStorage相應數量
        const cart = JSON.parse(localStorage.getItem('cartList'));
        const sizeIndex = cart.findIndex(product => product.id === item.id && product.size === item.size);
        const colorIndex = cart.findIndex(product => product.id === item.id && product.color === item.color);
        const waistAndLengthIndex = cart.findIndex(product => product.id === item.id && product.waist === item.waist && product.length === item.length);
        const sizeAndColorIndex = cart.findIndex(product => product.id === item.id && product.size === item.size && product.color === item.color);

        if((sizeIndex === -1 || colorIndex === -1 || waistAndLengthIndex === -1 || sizeAndColorIndex === -1)){
            const newCart = [...cart, item]
            localStorage.setItem('cartList', JSON.stringify(newCart))
            const sumTotal = newCart.reduce((prev, next) => {
                return prev + Math.ceil(next.quantity * next.discount * next.price) * 30
            }, 0)
            const sumQuantity = newCart.reduce((prev, next) => {
                return {
                    quantity: prev.quantity + next.quantity
                }
            }, {quantity: 0})
            dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            dispatch({type: "SUM_CART", payload: sumQuantity.quantity})
        }else if(item.waist !== "" && item.length !== "" && waistAndLengthIndex >= 0 && cart[waistAndLengthIndex].quantity > 0 && cart[waistAndLengthIndex].quantity < 11){
            if(id === "plus"){
                cart[waistAndLengthIndex].quantity += 1;
            }else if(id === "minus"){
                cart[waistAndLengthIndex].quantity -= 1;
            }else if(id === "add"){
                cart[waistAndLengthIndex].quantity += item.quantity;
            }
            localStorage.setItem('cartList', JSON.stringify(cart));
            const newCart = JSON.parse(localStorage.getItem('cartList'))
            const sumQuantity = cart.reduce((prev, next) => {
                return {
                    quantity: prev.quantity + next.quantity
                }
            }, {quantity: 0})
            const sumTotal = cart.reduce((prev, next) => {
                return prev + Math.ceil(next.quantity * next.discount * next.price) * 30
            }, 0)
            dispatch({type: "SET_CART", payload: newCart})
            dispatch({type: "SUM_CART", payload: sumQuantity.quantity})
            dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
        }else if(item.size !== "" && item.color !== "" && sizeAndColorIndex >= 0 && cart[sizeAndColorIndex].quantity > 0 && cart[sizeAndColorIndex].quantity < 11){
            if(id === "plus"){
                cart[sizeAndColorIndex].quantity += 1;
            }else if(id === "minus"){
                cart[sizeAndColorIndex].quantity -= 1;
            }else if(id === "add"){
                cart[sizeAndColorIndex].quantity += item.quantity;
            }
            localStorage.setItem('cartList', JSON.stringify(cart));
            const newCart = JSON.parse(localStorage.getItem('cartList'))
            const sumQuantity = cart.reduce((prev, next) => {
                return {
                    quantity: prev.quantity + next.quantity
                }
            }, {quantity: 0})
            const sumTotal = cart.reduce((prev, next) => {
                return prev + Math.ceil(next.quantity * next.discount * next.price) * 30
            }, 0)
            dispatch({type: "SET_CART", payload: newCart})
            dispatch({type: "SUM_CART", payload: sumQuantity.quantity})
            dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
        }else if(item.size !== "" && sizeIndex >= 0 && cart[sizeIndex].quantity > 0 && cart[sizeIndex].quantity < 11){
            if(id === "plus"){
                cart[sizeIndex].quantity += 1;
            }else if(id === "minus"){
                cart[sizeIndex].quantity -= 1;
            }else if(id === "add"){
                cart[sizeIndex].quantity += item.quantity;
            }
            localStorage.setItem('cartList', JSON.stringify(cart));
            const newCart = JSON.parse(localStorage.getItem('cartList'))
            const sumQuantity = cart.reduce((prev, next) => {
                return {
                    quantity: prev.quantity + next.quantity
                }
            }, {quantity: 0})
            const sumTotal = cart.reduce((prev, next) => {
                return prev + Math.ceil(next.quantity * next.discount * next.price) * 30
            }, 0)
            dispatch({type: "SET_CART", payload: newCart})
            dispatch({type: "SUM_CART", payload: sumQuantity.quantity})
            dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
        }else if(item.color !== "" && colorIndex >= 0 && cart[colorIndex].quantity > 0 && cart[colorIndex].quantity < 11){
            if(id === "plus"){
                cart[colorIndex].quantity += 1;
            }else if(id === "minus"){
                cart[colorIndex].quantity -= 1;
            }else if(id === "add"){
                cart[colorIndex].quantity += item.quantity;
            }
            localStorage.setItem('cartList', JSON.stringify(cart));
            const newCart = JSON.parse(localStorage.getItem('cartList'))
            const sumQuantity = cart.reduce((prev, next) => {
                return {
                    quantity: prev.quantity + next.quantity
                }
            }, {quantity: 0})
            const sumTotal = cart.reduce((prev, next) => {
                return prev + Math.ceil(next.quantity * next.discount * next.price) * 30
            }, 0)
            dispatch({type: "SET_CART", payload: newCart})
            dispatch({type: "SUM_CART", payload: sumQuantity.quantity})
            dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
        }
    }
}

// 在Cart頁面移除指定商品，同時也從購物車中移除
export const removeItem = (item) => {
    return async(dispatch) => {
        const {size, color, waist, length, id} = item;
        const getCart = JSON.parse(localStorage.getItem('cartList'))
        // 新的cart只留下，商品id相同或不同且size,color,waist or length, size or color與要刪除的不同之商品
        const newCart = getCart.filter((item) => (item.id === id || item.id !== id) && (item.size !== size || item.color !== color || (item.waist !== waist || item.length !== length) || (item.size !== size || item.color !== color)))
        localStorage.setItem('cartList', JSON.stringify(newCart))
        const sumAmount = newCart.reduce((prev, next) => {
            return{
                quantity: prev.quantity + next.quantity
            }
        }, {quantity: 0})
        const sumTotal = newCart.reduce((prev, next) => {
            return prev + Math.ceil(next.quantity * next.price * next.discount) * 30
        }, 0);
        dispatch({type: "SET_CART", payload: newCart})
        dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
        dispatch({type: "SUM_CART", payload: sumAmount.quantity})
    }
}

// 清空localStorage的購物車以及清除用戶輸入訊息
export const removeAll = () => {
    return async(dispatch) => {
        localStorage.setItem('cartList', JSON.stringify([]))
        dispatch({type: "CLEAR_CART"});
        dispatch({type: "REMOVER_USER_INFO"})
    }
}

// 取得結帳時用戶訊息
export const userInfo = (name, value) => {
    return (dispatch) => {
        dispatch({type: "SET_USER_INFO", payload: {name, value}})
    }
}

// 回到輸入用戶資訊頁
export const backToPrevPage = (status) => {
    return (dispatch) => {
        dispatch({type: "BACKTO_PREV_PAGE", payload: status})
    }
}

// 輸入完用戶資訊後進到下一頁
export const switchPaymentPage = (status) => {
    return (dispatch) => {
        dispatch({type: "SWITCH_PAYMENT_PAGE", payload: status})
    }
}

// 設定付款資訊輸入的區塊(顯示/不顯示)
export const paymentModal = (status) => {
    return (dispatch) => {
        dispatch({type: "SET_PAYMENT_MODAL", payload: status})
    }
}